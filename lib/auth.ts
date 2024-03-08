import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import { prisma } from "@/lib/prisma";
import prisma from "@/lib/prisma";
import { Account, AuthOptions, Profile, Session, User } from "next-auth";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "your@email.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null;
        }

        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        if (!user) {
          return null;
        }

        // console.log(`lastname: ${user.lastName}`);

        const userPassword = user.password;

        const isValidPassword = bcrypt.compareSync(password, userPassword);

        if (!isValidPassword) {
          return null;
        }

        // const userRole = await prisma.usersRole.findUnique({
        //   where: {
        //     userId: user.id
        //   },
        // });

        // return user;
        return {
          id: user.id,
          // firstName: user.firstName,
          // lastName: user.lastName,
          // email: user.email,
          role: user.role,
          // usersRole: {
          //   id:
          // }
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    async encode({ secret, token }) {
      if (!token) {
        throw new Error("No token to encode");
      }
      return jwt.sign(token, secret);
    },
    async decode({ secret, token }) {
      if (!token) {
        throw new Error("No token to decode");
      }
      const decodedToken = jwt.verify(token, secret);
      if (typeof decodedToken === "string") {
        return JSON.parse(decodedToken);
      } else {
        return decodedToken;
      }
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 3600,
    // updateAge: 60 * 60,
  },
  callbacks: {
    async session({ session, token }) {
      const u = token.user as unknown as any;
      if (token) {
        return {
          ...session,
          user: u,
        };
      }

      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        return { ...token, user };
      }

      return token;
    },
  },
  //   jwt({ token, user }) {
  //     if (user) token.role = user.role;
  //     return token;
  //   },
  //   session({ session, token }) {
  //     if (session?.user) session.user.role = token.role;
  //     return session;
  //   },
  // },
};
