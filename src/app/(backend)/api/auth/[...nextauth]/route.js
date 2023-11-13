import pool from "@/app/(backend)/utils/db";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { sqlQueries } from "@/app/(backend)/utils/sqlQueries";

const connection = await pool.getConnection();

export const authOption = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Provide email and password");
        }
        // Getting user by his/her e-mail from database
        const [data] = await connection.query(sqlQueries.user.getByEmail, [
          credentials.email,
        ]);
        connection.release();
        const user = data[0];

        // Verification of email and password.
        if (!user) {
          throw new Error("Invalid Email or Password.");
        }

        // Password Verification
        const isMatched = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isMatched) {
          throw new Error("Invalid Password");
        }

        return {
          name: user.fullname,
          email: user.email,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
    signUp: "/signup",
  },
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
