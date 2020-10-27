import mongoose, { Document, Schema } from "mongoose";
import { PasswordEncoder } from "../../security/password.encoder";

export interface IUser extends Document {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string | null;
  password: string;
  username: string | null;
  termsAccepted: Date;
  createdAt: Date;
  deletedAt?: Date;
  role: number;
}

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: false, default: null },
  lastName: { type: String, required: false, default: null },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  termsAccepted: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
  role: { type: Number, required: true, default: 1 },
});

UserSchema.pre("save", async function () {
  const user = <IUser>this;
  user.password = await PasswordEncoder.cryptPassword(user.password);
});

UserSchema.path("email").validate(async (value) => {
  const emailCount = await mongoose.models.users.countDocuments({
    email: value,
  });
  return !emailCount;
}, "Can`t create account");

UserSchema.path("username").validate(async (value) => {
  const emailCount = await mongoose.models.users.countDocuments({
    username: value,
  });
  return !emailCount;
}, "Can`t create account");

export default mongoose.model<IUser>("users", UserSchema);
