import {PostDto} from "../form/post.dto";
import Post, {IPost} from "../schema/post.schema";
import {PostsQuery} from "../helper/posts.query";
import {escapeRegExp} from "tslint/lib/utils";
import {Document, DocumentQuery, Query} from "mongoose";

export class PostModel {
    public static async createPost(data: PostDto): Promise<IPost>{
        const post = new Post(data);

        return post.save();
    }

    public static getPostsQuery(query: PostsQuery): DocumentQuery<Document[], Document, {}>{
        let findQuery = {};

        if(query.search) {
            const search = '/'+escapeRegExp(query.search)+'/';

            findQuery = {'title' : search, 'description': search, 'body': search}
        }

        return Post.find(findQuery).populate('user');
    }
}