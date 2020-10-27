import mongoose from "mongoose";

export function connect(): void {
  mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
}
