import mongoose from "mongoose";
// Imports the mongoose library.

const MONGODB_URI = process.env.MONGODB_URI!;
// Retrieves the MongoDB URI from environment variables.

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
  // Throws an error if the MongoDB URI is not defined.
}

// Sets up the global mongoose variable.
// It is used for verufying i someone has initiated a connection to the database.
let cached = global.mongoose;
// Retrieves the global mongoose variable.

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
  // Initializes the global mongoose variable if it is not already defined.
}

export async function connectToDatabase() {
  // Function to connect to the MongoDB database.
  if (cached.conn) {
    return cached.conn;
    // Returns the existing connection if it exists.
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10,
    };
    // Connection options for mongoose.


    // Initaiating a promise for the connection.
    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then(() => mongoose.connection);
    // Creates a new connection promise if it does not exist.
  }

  try {
    cached.conn = await cached.promise;
    // Waits for the connection promise to resolve and stores the connection.
  } catch (e) {
    cached.promise = null;
    // Resets the promise if the connection fails.
    throw e;
  }

  return cached.conn;
  // Returns the established connection.
}
