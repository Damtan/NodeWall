import mongoose, {Document, Schema} from "mongoose";
import {IUser} from "../../users/schema/user.schema";

export interface IRate extends Document {
    _id: string;
    createdAt: Date;
    user: IUser;
    rate: boolean,
    entityDescr: string,
    rateableEntityId: string
}

const RateSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
    createdAt: { type: Date, default: Date.now },
    rate: { type: Schema.Types.Boolean},
    entityDescr: { type: Schema.Types.String, required: true},
    rateableEntityId: {type: Schema.Types.ObjectId, required: true}
});

export default mongoose.model<IRate>('rates', RateSchema);