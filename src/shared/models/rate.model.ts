import { Document, Model } from "mongoose";
import { injectable } from "inversify";
import { ModelBaseService } from "../../db/service/model.base.service";
import Rate, { IRate } from "../schema/rate.schema";
import { CommentDto } from "../form/comment.dto";

@injectable()
export class RateModel extends ModelBaseService {
  protected getModel(): Model<Document, {}> {
    return Rate;
  }

  public async create(
    userId: string,
    rate: boolean,
    entityDescr: string,
    rateableEntityId: string
  ): Promise<IRate> {
    const comment = new Rate({
      user: userId,
      rate: rate,
      entityDescr: entityDescr,
      rateableEntityId: rateableEntityId,
    });

    return comment.save();
  }
  public async isAlreadyRated(
    entityDescr: string,
    rateableEntityId: string,
    userId: string
  ): Promise<boolean> {
    return (
      (await this.getModel().countDocuments({
        user: userId,
        entityDescr: entityDescr,
        rateableEntityId: rateableEntityId,
      })) > 0
    );
  }
}
