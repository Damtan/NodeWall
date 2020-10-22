import mongoose, {Document, Schema} from "mongoose";
import {IUser} from "../../users/schema/user.schema";
import {IRate} from "./rate.schema";

export interface IComment extends Document {
    _id: string;
    body: string;
    createdAt: Date;
    user: IUser;
    deletedAt: Date;
    rates: IRate[],
    overallRate: number
}

const CommentSchema = new Schema({
    body: { type: String, required: true, maxlength: 500, minlength: 10 },
    user: { type: mongoose.Types.ObjectId, required: true, ref: 'users' },
    createdAt: { type: Date, default: Date.now },
    deletedAt: { type: Date },
    overallRate: { type: Number, default: 0},
    rates: [
        {
            type: mongoose.Types.ObjectId,
            ref: "rates"
        }
    ]
});

export default mongoose.model<IComment>('comment', CommentSchema);