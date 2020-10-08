import {inject, injectable} from "inversify";
import {
    Authorized,
    Body,
    CurrentUser,
    Get,
    JsonController, Param, Patch,
    Post,
    QueryParams, UseBefore
} from "routing-controllers";
import {TYPES as PostTypes}  from "../types/types";
import {IUser} from "../../users/schema/user.schema";
import {PostDto} from "../form/post.dto";
import {IPostService} from "../interfaces/post.service.interface";
import {IPost} from "../schema/post.schema";
import {PostsQuery} from "../helper/posts.query";
import {PostModel} from "../models/post.model";
import {PostEntity} from "../entity/post.entity";
import {SharedTypes} from "../../shared/types/types";
import {IPaginatorService} from "../../shared/interface/paginator.interface";
import {PaginateDto} from "../../shared/dto/paginate.dto";
import {ValidationIdMiddleware} from "../../middleware/validation/validation.id.middleware";
import {plainToClass} from "class-transformer";

@injectable()
@JsonController()
export class PostController {
    @inject(PostTypes.IPostService) private postService: IPostService;
    @inject(SharedTypes.IPaginatorService) private paginatorService: IPaginatorService;
    @inject(PostModel) private postModel: PostModel

    @Authorized()
    @Post("/posts")
    public async createPost(@Body({ validate: true }) postDto :PostDto, @CurrentUser() user: IUser) : Promise<string> {
        postDto.user = user._id;

        return await this.postService.createPost(postDto).then((result: IPost) => {
            return result._id.toString();
        });
    }

    @Get("/posts")
    public async getPosts(@QueryParams() query: PostsQuery) : Promise<PaginateDto>{
        return this.paginatorService.paginate(PostEntity, this.postModel.getPostsQuery(query), query.page, query.limit);
    }

    @Authorized()
    @Patch("/posts/:id")
    @UseBefore(ValidationIdMiddleware)
    public async updatePost(@Body({ validate: true }) postDto :PostDto, @CurrentUser() user: IUser, @Param("id") id: string): Promise<string>{
        postDto.user = user._id;

        return await this.postService.updatePost(postDto, id).then((result: IPost) => {
            return result._id.toString();
        });
    }

    @Get("/posts/:id")
    @UseBefore(ValidationIdMiddleware)
    public async getPost(@Param("id") id: string) : Promise<PostEntity>{
        const postWithComments = await this.postModel.getPostWithComments(id);

        return plainToClass(PostEntity, postWithComments.toObject(), { strategy: 'excludeAll' });
    }
}