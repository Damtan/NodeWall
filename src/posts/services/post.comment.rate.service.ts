import {inject, injectable} from "inversify";
import {PostModel} from "../models/post.model";
import {IUser} from "../../users/schema/user.schema";
import {CommentModel} from "../../shared/models/comment.model";
import {IComment} from "../../shared/schema/comment.schema";
import {RateModel} from "../../shared/models/rate.model";
import {BadRequestError} from "routing-controllers/http-error/BadRequestError";
import {NotFoundError} from "routing-controllers";
import {IPost} from "../schema/post.schema";

@injectable()
export class PostCommentRateService {
    private readonly ENTITY_POST_COMMENT_RATE = 'post_comment';

    @inject(PostModel) private postModel: PostModel;
    @inject(CommentModel) private commentModel: CommentModel;
    @inject(RateModel) private rateModel: RateModel;

    public async create(postId: string, commentId: string, isUpVote: boolean, user: IUser): Promise<void>{
        const post = await <Promise<IPost>>this.postModel.findById(postId);

        if (!post) {
            throw new NotFoundError('Post not found');
        }

        const comment = await <Promise<IComment>>this.commentModel.findById(commentId);

        if (!comment) {
            throw new NotFoundError('Comment not found');
        }

        if (await this.rateModel.isAlreadyRated(this.ENTITY_POST_COMMENT_RATE, commentId, user._id)) {
            throw new BadRequestError('Comment already rated');
        }

        const rate = await this.rateModel.create(user._id, isUpVote, this.ENTITY_POST_COMMENT_RATE, commentId);

        await comment.updateOne({ $push: { rates: rate }, 'user':user._id, 'overallRate': isUpVote ? ++comment.overallRate : --comment.overallRate }).exec();
    }
}