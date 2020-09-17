import {IPost} from "../schema/post.schema";
import {PostDto} from "../form/post.dto";

export interface IPostService {
    createPost(postDto: PostDto): Promise<IPost>
}