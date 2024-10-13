import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./prisma"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: {
          label: 'username',
          type: 'text',
          placeholder: 'enter username'
        },
        password: {
          label: 'password',
          type: 'password'
        },
      },
      authorize: async (credentials) => {

        if (!credentials?.username || !credentials?.password) {
          throw new Error("Invalid credentials");
        }
       
        const  user = await prisma.user.findUnique({
          where: {
            username: credentials.username
          }
        })

        // if(!user || )
         
        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.")
        }
        // return user object with their profile data
        return user
      },
    }),
   
  ],
})