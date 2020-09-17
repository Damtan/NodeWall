import {IPostService} from "../interfaces/post.service.interface";
import {IPost} from "../schema/post.schema";
import {PostDto} from "../form/post.dto";
import {PostModel} from "../models/post.model";
import {injectable} from "inversify";

@injectable()
export class PostService implements IPostService{
    public createPost(postDto: PostDto): Promise<IPost>{
        return PostModel.createPost(postDto);
    }
}