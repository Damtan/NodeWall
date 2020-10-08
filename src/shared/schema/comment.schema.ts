import mongoose, {Document, Schema} from "mongoose";
import {IUser} from "../../users/schema/user.schema";

export interface IComment extends Document {
    _id: string;
    body: string;
    createdAt: Date;
    user: IUser;
    deletedAt: Date;
}

const CommentSchema = new Schema({
    body: { type: String, required: true, maxlength: 500, minlength: 10 },
    user: { type: mongoose.Types.ObjectId, required: true, ref: 'users' },
    createdAt: { type: Date, default: Date.now },
    deletedAt: { type: Date }
});

export default mongoose.model<IComment>('comment', CommentSchema);