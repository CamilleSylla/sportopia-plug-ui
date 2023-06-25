import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SIGN_IN } from "@/queries/auth";
import client from "../../../../apollo-client";

export const authOptions :NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        
        // Include additional properties from the user object in the session token
        token.id = user.id;
        token.lastname = user.lastname;
        token.firstname = user.firstname;
        token.club = user.club;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({session, token}) {
      // Include additional properties from the token in the session object
      session.user.id = token.id;
      session.user.lastname = token.lastname;
      session.user.firstname = token.firstname;
      session.user.club = token.club;
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "email", type: "text", placeholder: "sportopiaplug@example.com" },
        password: { label: "password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          const { data, errors } = await client.query({
            query: SIGN_IN,
            variables: {
              email: credentials.email,
              password: credentials.password,
            },
          });
          if (errors) {
            return null;
          }
          const user = data.signIn;
          return user;
        } catch (error) {
          console.error("An error occurred during authentication:", error);
          return null;
        }
      }
    })
  ],
};
export default NextAuth(authOptions);
