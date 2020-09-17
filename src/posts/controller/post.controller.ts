import {inject, injectable} from "inversify";
import {
    Authorized,
    BadRequestError,
    Body,
    CurrentUser,
    Get,
    JsonController,
    Post,
    QueryParams
} from "routing-controllers";
import {TYPES} from "../types/types";
import {plainToClass} from "class-transformer";
import {IUser} from "../../users/schema/user.schema";
import {PostDto} from "../form/post.dto";
import {IPostService} from "../interfaces/post.service.interface";
import {IPost} from "../schema/post.schema";
import {PostsQuery} from "../helper/posts.query";
import {PostModel} from "../models/post.model";
import {PostEntity} from "../entity/post.entity";

@injectable()
@JsonController()
export class PostController {
    @inject(TYPES.IPostService) private postService: IPostService;

    @Authorized()
    @Post("/post")
    public async loginAction(@Body({ validate: true }) postDto :PostDto, @CurrentUser() user: IUser) : Promise<string> {
        postDto.user = user._id;

        return await this.postService.createPost(postDto).then((result: IPost) => {
            return result._id.toString();
        }).catch(function(err) {
            throw new BadRequestError(err);
        });
    }


    @Get("/post")
    public async getPost(@QueryParams() query: PostsQuery) : Promise<any>{
        const posts = await PostModel.getPosts(query);
        const postJson = posts.map(function (post: IPost) {
            return post.toObject();
        });
        return plainToClass(PostEntity, postJson, { strategy: 'excludeAll' });
    }
}