import { Document, Model } from "mongoose";
import { injectable } from "inversify";
import { ModelBaseService } from "../../db/service/model.base.service";
import Comment, { IComment } from "../schema/comment.schema";
import { CommentDto } from "../form/comment.dto";

@injectable()
export class CommentModel extends ModelBaseService {
  protected getModel(): Model<Document, {}> {
    return Comment;
  }

  public async createPost(data: CommentDto): Promise<IComment> {
    const comment = new Comment(data);

    return comment.save();
  }
}
