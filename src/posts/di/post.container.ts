import { Container } from "inversify";
import { TYPES } from "../types/types";
import {IPostService} from "../interfaces/post.service.interface";
import {PostService} from "../services/post.service";
import {PostController} from "../controller/post.controller";
import {PostModel} from "../models/post.model";
import {PostCommentService} from "../services/post.comment.service";
import {PostCommentController} from "../controller/post.comment.controller";

const postContainer = new Container();

postContainer.bind<IPostService>(TYPES.IPostService).to(PostService);
postContainer.bind(PostController).toSelf();
postContainer.bind<PostModel>(PostModel).to(PostModel);
postContainer.bind<PostCommentService>(PostCommentService).to(PostCommentService);
postContainer.bind(PostCommentController).toSelf();

export { postContainer };