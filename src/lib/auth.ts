// import 'server-only'
// // lib/auth.ts
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import prisma from "@/lib/prisma"; // Ensure Prisma client is available

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text", placeholder: "email@example.com" },
//         password: { label: "Password", type: "password" },
//       },
//       authorize: async (credentials) => {
//         const user = await prisma.user.findUnique({
//           where: { email: credentials?.email },
//         });

//         if (user && user.password === credentials?.password) {
//           return user;
//         }

//         return null;
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.id = token.id;
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/login",
//   },
// };

// export default NextAuth(authOptions);
