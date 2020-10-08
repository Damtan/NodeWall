import { Container } from "inversify";
import { SharedTypes } from "../types/types";

import {IPaginatorService} from "../interface/paginator.interface";
import {PaginatorService} from "../service/paginator.service";
import {CommentModel} from "../models/comment.model";

const sharedContainer = new Container();

sharedContainer.bind<IPaginatorService>(SharedTypes.IPaginatorService).to(PaginatorService);
sharedContainer.bind<CommentModel>(CommentModel).toSelf();

export { sharedContainer };