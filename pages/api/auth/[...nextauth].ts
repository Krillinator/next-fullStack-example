import { UserModel } from "@/schemas/userSchema"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDatabase } from "@/utils/db"
import { NextApiRequest, NextApiResponse } from "next"

interface UserAuthentication {
  id: string
  username: string
  password: string
  // image optional
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase()

  return NextAuth(req, res, {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          username: {
            label: "Username",
            type: "text",
            placeholder: "jsmith",
          },
          password: {
            label: "Password",
            type: "password",
          },
        },
        async authorize(credentials): Promise<UserAuthentication | null> {
          // Add logic here to look up the user from the credentials supplied
          console.log("authorize function is running")
          // ClientPromise <-- If you run MongoClient!

          // Check if the user exists in the database
          const existingUser = await UserModel.findOne({
            username: credentials?.username,
            password: credentials?.password,
          })

          if (!existingUser) {
            console.log("NO USER")

            return null
          }

          // If all checks pass, return the authenticated user object
          return existingUser
        },
      }),
    ],
    pages: {
      signIn: "/auth/signin",
      signOut: "/auth/signout",
      error: "/auth/error", // Error code passed in query string as ?error=
      verifyRequest: "/auth/verify-request", // (used for check email message)
      newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
    },
  })
}
