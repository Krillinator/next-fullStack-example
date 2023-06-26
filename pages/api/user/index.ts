import { NextApiRequest, NextApiResponse } from "next"
import { connectToDatabase } from "@/utils/db"
import { User } from "@/types/user"
import { UserModel } from "@/schemas/userSchema"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[] | string>
) {
  try {
    await connectToDatabase()

    switch (req.method) {
      case "GET": {
        // Get all users from the database
        const users = await UserModel.find().lean().exec()

        if (users.length === 0) {
          res.status(200).json("EMPTY")
        } else {
          res.status(200).json(users)
        }

        break
      }

      default: {
        // Return a 405 Method Not Allowed error for all other HTTP methods
        res.setHeader("Allow", ["GET"])
        res.status(405).end(`Method ${req.method} Not Allowed`)
        break
      }
    }
  } catch (error) {
    throw new Error("Something went wrong " + error)
  }
}
