import mongoose, {Document, Schema} from "mongoose";
import {IUser} from "../../users/schema/user.schema";
import {IComment} from "../../shared/schema/comment.schema";
import {IRate} from "../../shared/schema/rate.schema";

export interface IPost extends Document {
    _id: string;
    title: string;
    description?: string;
    body: string;
    createdAt: Date;
    user: IUser,
    comments: IComment[],
    overallRate: number,
    rates: IRate[]
}

const PostSchema = new Schema({
    title: { type: String, required: true, maxlength: 50, minlength: 10 },
    description: { type: String, required: false, default: null, maxlength: 50 },
    body: { type: String, required: true, maxlength: 500, minlength: 10 },
    user: { type: mongoose.Types.ObjectId, required: true, ref: 'users' },
    createdAt: { type: Date, default: Date.now },
    comments: [
        {
            type: mongoose.Types.ObjectId,
            ref: "comment"
        }
    ],
    overallRate: { type: Number, default: 0},
    rates: [
        {
            type: mongoose.Types.ObjectId,
            ref: "rates"
        }
    ]
});

export default mongoose.model<IPost>('posts', PostSchema);