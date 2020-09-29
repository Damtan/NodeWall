import { Container } from "inversify";
import { TYPES } from "../types/types";
import {IPostService} from "../interfaces/post.service.interface";
import {PostService} from "../services/post.service";
import {PostController} from "../controller/post.controller";
import {PostModel} from "../models/post.model";

const postContainer = new Container();

postContainer.bind<IPostService>(TYPES.IPostService).to(PostService);
postContainer.bind(PostController).toSelf();
postContainer.bind<PostModel>(PostModel).to(PostModel);

export { postContainer };