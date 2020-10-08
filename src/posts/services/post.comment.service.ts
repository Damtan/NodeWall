import {inject, injectable} from "inversify";
import {PostModel} from "../models/post.model";
import {IUser} from "../../users/schema/user.schema";
import {IPost} from "../schema/post.schema";
import {CommentModel} from "../../shared/models/comment.model";
import {CommentDto} from "../../shared/form/comment.dto";
import {IComment} from "../../shared/schema/comment.schema";

@injectable()
export class PostCommentService {
    @inject(PostModel) private postModel: PostModel;
    @inject(CommentModel) private commentModel: CommentModel;

    public async create(commentDto: CommentDto, postId: string, user: IUser): Promise<IComment>{
        const post = await <Promise<IPost>>this.postModel.findById(postId);

        const comment = await this.commentModel.createPost(commentDto);
        await post.update( { $push: { comments: comment._id } },
            { new: true, useFindAndModify: false }).exec();

        return comment;
    }
}