import { Container } from "inversify";
import { TYPES } from "../types/types";
import { IPostService } from "../interfaces/post.service.interface";
import { PostService } from "../services/post.service";
import { PostController } from "../controller/post.controller";
import { PostModel } from "../models/post.model";
import { PostCommentService } from "../services/post.comment.service";
import { PostCommentController } from "../controller/post.comment.controller";
import { PostCommentRateController } from "../controller/post.comment.rate.controller";
import { PostCommentRateService } from "../services/post.comment.rate.service";
import { PostRateController } from "../controller/post.rate.controller";
import { PostRateService } from "../services/post.rate.service";

const postContainer = new Container();

postContainer.bind<IPostService>(TYPES.IPostService).to(PostService);
postContainer.bind(PostController).toSelf();
postContainer.bind<PostModel>(PostModel).to(PostModel);
postContainer
  .bind<PostCommentService>(PostCommentService)
  .to(PostCommentService);
postContainer.bind(PostCommentController).toSelf();
postContainer.bind(PostCommentRateController).toSelf();
postContainer.bind<PostCommentRateService>(PostCommentRateService).toSelf();
postContainer.bind(PostRateController).toSelf();
postContainer.bind<PostRateService>(PostRateService).toSelf();

export { postContainer };
