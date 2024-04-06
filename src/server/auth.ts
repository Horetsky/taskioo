import { getServerSession, type NextAuthOptions, type Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getUserByEmail, getUserProfile } from "@/server/api/utils";

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

        async jwt({ token }) {
            if(!token.sub) return token;

            token.userId = token.sub;

            const profile = await getUserProfile(token.sub);

            if(!profile) return token;

            token.profileId = profile.id;
            token.image = profile.picture;
            token.name = profile.name;
            token.surname = profile.surname;
            token.username = profile.username;

            return token;
        },

        session({ session, token }) {

            if(token && session.user) {
                session.user.userId = token.userId;
                session.user.profileId = token.profileId;
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