import { authMiddleware } from "@/middlewares/auth-middleware";


export default authMiddleware;

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};