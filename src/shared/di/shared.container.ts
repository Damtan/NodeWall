import { Container } from "inversify";
import { SharedTypes } from "../types/types";

import {IPaginatorService} from "../interface/paginator.interface";
import {PaginatorService} from "../service/paginator.service";

const sharedContainer = new Container();
sharedContainer.bind<IPaginatorService>(SharedTypes.IPaginatorService).to(PaginatorService);

export { sharedContainer };