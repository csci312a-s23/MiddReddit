import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "../../../../models/User.js";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        return (
          profile.email_verified && profile.email.endsWith("@middlebury.edu")
        );
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
    async jwt({ token, user }) {
      if (user) {
        let localUser = await User.query().findOne("googleId", user.id);
        if (!localUser) {
          // Create new user record in the database
          localUser = await User.query().insertAndFetch({
            googleId: user.id,
            name: user.name,
            email: user.email,
          });
        }
        //console.log(localUser);
        // Add user id to the token
        token.id = localUser.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Add user id to the session
      session.user.id = token.id;
      return session;
    },
  },
};

export default NextAuth(authOptions);
