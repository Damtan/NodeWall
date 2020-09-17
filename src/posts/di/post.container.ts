import { Container } from "inversify";
import { TYPES } from "../types/types";

import {IPostService} from "../interfaces/post.service.interface";
import {PostService} from "../services/post.service";
import {PostController} from "../controller/post.controller";

const postContainer = new Container();
postContainer.bind<IPostService>(TYPES.IPostService).to(PostService);
postContainer.bind(PostController).toSelf();

export { postContainer };