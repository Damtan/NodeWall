import {PostDto} from "../form/post.dto";
import Post, {IPost} from "../schema/post.schema";
import {PostsQuery} from "../helper/posts.query";
import {escapeRegExp} from "tslint/lib/utils";
import {Document, DocumentQuery, Model} from "mongoose";
import {injectable} from "inversify";
import {ModelBaseService} from "../../db/service/model.base.service";

@injectable()
export class PostModel extends ModelBaseService {
    protected getModel(): Model<Document, {}> {
        return Post;
    }

    public async createPost(data: PostDto): Promise<IPost>{
        const post = new Post(data);

        return post.save();
    }

    public getPostsQuery(query: PostsQuery): DocumentQuery<Document[], Document, {}>{
        let findQuery = {};

        if(query.search) {
            const search = '/'+escapeRegExp(query.search)+'/';

            findQuery = {'title' : search, 'description': search, 'body': search}
        }

        return this.getModel().find(findQuery).populate('user');
    }

    public async findOneByUserAndIdAndUpdate(data: PostDto, id: string): Promise<IPost>{
        return <Promise<IPost>>this.getModel().findOneAndUpdate({_id: id, user: { _id: data.user} }, data).exec();
    }
}