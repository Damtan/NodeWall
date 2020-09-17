import mongoose, {Document, Schema} from 'mongoose';
import {PasswordEncoder} from "../../security/password.encoder";

export interface IUser extends Document {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    username: string;
    termsAccepted: Date;
    createdAt: Date;
    deletedAt ?: Date
}

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: false, default: null },
    lastName: { type: String, required: false, default: null },
    password: { type: String, required: true},
    username: { type: String, required: true, unique: true },
    termsAccepted: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null }
});

UserSchema.pre('save', async function () {
    let user = <IUser>this;
    user.password = await PasswordEncoder.cryptPassword(user.password);
});

UserSchema.path('email').validate(async (value) => {
    const emailCount = await mongoose.models.users.countDocuments({email: value });
    return !emailCount;
}, 'Can`t create account');

UserSchema.path('username').validate(async (value) => {
    const emailCount = await mongoose.models.users.countDocuments({username: value });
    return !emailCount;
}, 'Can`t create account');

export default mongoose.model<IUser>('users', UserSchema);