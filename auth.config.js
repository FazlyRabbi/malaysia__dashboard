import axios from "axios";
import Credentials from "next-auth/providers/credentials";

export default {
  providers: [
    Credentials({
      credentials: {
        phone: { label: "Phone" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Fetch the user data from your API
          const response = await axios.patch(
            `${process.env.API_URL}/api/user`,
            {
              phone: credentials.phone,
            }
          );

          const user = response.data.data;

          if (!user) {
            throw new Error("User not found.");
          }

          if (credentials.password !== user.password) {
            throw new Error("Invalid password.");
          }

          // Extract necessary user information
          const { phone, role } = user;

          return { phone, role };
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],

  callbacks: {
    async session({ session, token, user }) {
      session.user = token.user;
      return session;
    },
    async redirect({ url, baseUrl }) {
      // // Allows relative callback URLs
      // if (url.startsWith("/")) return `${baseUrl}${url}`;
      // // Allows callback URLs on the same origin
      // else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
};
