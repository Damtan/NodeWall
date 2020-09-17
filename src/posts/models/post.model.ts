import {PostDto} from "../form/post.dto";
import Post, {IPost} from "../schema/post.schema";
import {PostsQuery} from "../helper/posts.query";
import {escapeRegExp} from "tslint/lib/utils";


export class PostModel {
    public static async createPost(data: PostDto): Promise<IPost>{
        const post = new Post(data);

        return post.save();
    }

    public static async getPosts(query: PostsQuery): Promise<IPost[]>{
        const regexpSearch = escapeRegExp(query.search);
        const findQuery = {'title' : regexpSearch, 'description': regexpSearch, 'body': regexpSearch}

        return Post.find({}, findQuery,{skip:query.page, limit: query.limit});
    }
}