import mongoose from "mongoose"

if (!process.env.MONGODB_URI) {
  throw new Error("No MongoDB URI specified")
}

const uri = process.env.MONGODB_URI

let cachedDb: typeof mongoose | null = null

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cachedDb) {
    return cachedDb
  }

  try {
    const db = await mongoose.connect(uri, {
      socketTimeoutMS: 5000,
    })

    cachedDb = db
    console.log("CONNECTED TO DATABASE")

    return db
  } catch (err) {
    throw new Error(`Failed to connect to database: ${err}`)
  }
}

// Handle disconnecting from database when Node.js process is terminated
process.on("SIGINT", gracefulShutdown)
process.on("SIGTERM", gracefulShutdown)

async function gracefulShutdown() {
  console.log("Shutting down gracefully...")
  try {
    if (cachedDb) {
      await cachedDb.disconnect()
      console.log("Disconnected from MongoDB")
    }
    process.exit(0)
  } catch (err) {
    console.error(`Failed to disconnect from database: ${err}`)
    process.exit(1)
  }
}
