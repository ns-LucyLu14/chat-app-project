import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { type Adapter } from "next-auth/adapters";

import { env } from "~/env";
import { db } from "~/server/db";
import { api } from "~/trpc/server";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      username: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: {
          label: "Name",
          type: "text",
          placeholder: "Enter your name...",
        },
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter your username...",
        },
      },
      async authorize(credentials, req) {
        // Destructure the credentials
        const { name, username } = credentials ?? {};

        // Check for existing user in the database
        const existingUser = await db.user.findUnique({
          where: { username: username },
        });

        if (existingUser) {
          // User exists, return the existing user
          return existingUser;
        } else {
          // User does not exist, create a new user
          let newUser;
          if (name && username) {
            newUser = await api.user.create({ name, username });
          }

          return newUser;
        }
      },
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token, user }) {
      // Include user.id, user.username, and user.name in the session
      if (session?.user) {
        session.user.id = token.sub; // User ID is in the token's subject
        session.user.username = token.username as string; // Pass username from token
        session.user.name = token.name as string; // Pass name from token
      }
      return session;
    },
    async jwt({ token, user }) {
      // When a user is first logged in, include `username` and `name` in the JWT
      if (user) {
        token.username = user.username;
        token.name = user.name;
      }
      return token;
    },
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
