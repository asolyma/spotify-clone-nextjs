import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { LOGIN_URL } from "../../../lib/spotify";
import { JWT } from "next-auth/jwt";
import { Mytoken } from "../../../types/types";
import refreshAccessToken from "../../../lib/refreshToken";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}`,
      clientSecret: `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`,
      authorization: LOGIN_URL,
    }),
  ],
  secret: `${process.env.NEXT_AUTH_SECRET}`,
  pages: { signIn: "/signin" },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log(token);
      //initial signin
      if (account && user) {
        //const mytoken:Mytoken = {...token,accessToken:account.access_token,refreshToken:account.refresh_token,accessTokenExpires:account.expires_at,username:account.providerAccountId}
        // return mytoken
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at
            ? account.expires_at * 1000
            : undefined,
        };
      }
      const t = token as Mytoken;
      if (Date.now() < t.accessTokenExpires!) {
        return token;
      } else return refreshAccessToken(t);
    },
    async session({ session, token }) {
      const t = token as Mytoken;
      return { ...session, ...token };
    },
    redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      // Allows relative callback URLs
      else if (url.startsWith("/")) return new URL(url, baseUrl).toString();
      return baseUrl;
    },
  },
});
