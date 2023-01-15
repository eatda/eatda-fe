import NextAuth from "next-auth/next";
import KakaoProvider from "next-auth/providers/kakao";

export default NextAuth({
    providers: [
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID!,
            clientSecret: process.env.KAKAO_CLIENT_SECRET!,
        })
    ],
    // callbacks: {
    //     async jwt({ token }) {
    //       token.userRole = "admin"
    //       console.log('?:',token);
    //       return token
    //     },
    //     async session({ session, token, user }) {
    //       // Send properties to the client, like an access_token and user id from a provider.
    //       // session.accessToken = token.accessToken
    //       // session.user.id = token.id
    //       // console.log(user.id)
    //       console.log('!',session,'!')
          
    //       return session
    //     }
    //   },
})