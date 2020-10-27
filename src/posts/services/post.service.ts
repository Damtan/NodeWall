import { IPostService } from "../interfaces/post.service.interface";
import { IPost } from "../schema/post.schema";
import { PostDto } from "../form/post.dto";
import { PostModel } from "../models/post.model";
import { inject, injectable } from "inversify";

@injectable()
export class PostService implements IPostService {
  @inject(PostModel) private postModel: PostModel;

  public async createPost(postDto: PostDto): Promise<IPost> {
    return this.postModel.createPost(postDto);
  }

  public async updatePost(postDto: PostDto, id: string): Promise<IPost> {
    return this.postModel.findOneByUserAndIdAndUpdate(postDto, id);
  }
}
