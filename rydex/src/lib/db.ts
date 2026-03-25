import mongoose from "mongoose";

const mongoDbUrl = process.env.MONGODB_URL;
if (!mongoDbUrl) {
  throw new Error("DB URL not found!");
}

// @ts-ignore
let cached = global.mongooseConnection;

if (!cached) {
  // @ts-ignore
  cached = global.mongooseConnection = { conn: null, promise: null };
}

const connectDb = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(mongoDbUrl)
      .then((mongooseInstance) => mongooseInstance.connection);
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default connectDb;