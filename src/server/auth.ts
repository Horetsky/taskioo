import { getServerSession, type NextAuthOptions, type Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getUserByEmail, getUserProfile } from "@/server/api/utils";
import { getWorkspacesBuUserId } from "@/server/api/utils";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60, // 24 hours,
    },
    pages: {
        signIn: "/login"
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if(!credentials) return null;

                const { email, password } = credentials;

                const dbUser = await getUserByEmail(email);

                if(!dbUser || !dbUser.password) {
                    throw new Error("User with provided email does not exist.");
                }

                const passwordMatch = await bcrypt.compare(
                    password,
                    dbUser.password
                );

                if(!passwordMatch) {
                    throw new Error("Incorrect password.");
                }

                return dbUser;
            }
        })
    ],
    callbacks: {

        async jwt({ token, trigger, session }) {
            if(!token.sub) return token;

            if(trigger === "signIn") {
                token.userId = token.sub;

                {
                    const workspace = await getWorkspacesBuUserId(token.sub);
                    token.workspaceId = workspace[0] ? workspace[0].id : undefined;
                }

                {
                    const profile = await getUserProfile(token.sub);
                    if(!profile) return token;

                    token.profileId = profile.id;
                    token.image = profile.picture;
                    token.name = profile.name;
                    token.surname = profile.surname;
                    token.username = profile.username;
                }
            }

            if(trigger === "update") {
                // Update profile
                if(session.profile) {
                    token.profileId = session.profile.id;
                    token.image = session.profile.picture;
                    token.name = session.profile.name;
                    token.surname = session.profile.surname;
                    token.username = session.profile.username;
                }

                // Update workspace
                if(session.user && session.user.workspaceId) {
                    token.workspaceId = session.user.workspaceId;
                }
            }
            return token;
        },

        session({ session, token }) {

            if(token && session.user) {
                session.user.userId = token.userId;
                session.user.profileId = token.profileId;
                session.user.workspaceId = token.workspaceId;
                session.user.image = token.image;
                session.user.name = token.name;
                session.user.surname = token.surname;
                session.user.username = token.username;
            }

            return session;
        }
    }
};

export const getSession = () => getServerSession(authOptions) as Promise<Session>;