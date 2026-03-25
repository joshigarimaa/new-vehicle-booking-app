const mongoDbUrl = process.env.MONGODB_URL;
import mongoose from "mongoose";
if (!mongoDbUrl) {
  throw new Error("DB URL not found!");
}

let cached = global.mongooseConnection;
if (!cached) {
  cached = global.mongooseConnection = { conn: null, promise: null };
}

const connectDb = async () => {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(mongoDbUrl).then((c) => c.connection);
  }
  try {
    const conn = await cached.promise;
    return conn;
  } catch (error) {
    console.log(error);
  }
};
export default connectDb;
