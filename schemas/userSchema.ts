import { User } from "@/types/user"
import mongoose, { Schema } from "mongoose"

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
)

userSchema.methods.fullName = function () {
  return `${this.name.first} ${this.name.last}`
}

export const UserModel =
  mongoose.models.UserModel ||
  mongoose.model<User>("UserModel", userSchema, "users")
