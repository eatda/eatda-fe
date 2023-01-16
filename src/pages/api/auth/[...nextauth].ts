import NextAuth, {DefaultSession} from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";

declare module "next-auth" {
    interface Session {
        user:{
            userId?: string
        }& DefaultSession["user"]
    }
}
export default NextAuth({
    providers: [
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID!,
            clientSecret: process.env.KAKAO_CLIENT_SECRET!,
        })
    ],
    callbacks: {
        session({session, token}){
            session.user.userId = token.sub
            return session
        }
    }
})