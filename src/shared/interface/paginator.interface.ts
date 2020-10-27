import { Document, DocumentQuery } from "mongoose";
import { PaginateDto } from "../dto/paginate.dto";
import { ClassType } from "class-transformer/ClassTransformer";
import { EntityInterface } from "./entity.interface";

export interface IPaginatorService {
  paginate(
    entityClass: ClassType<EntityInterface>,
    query: DocumentQuery<Document[], Document, {}>,
    page: number,
    limit: number
  ): Promise<PaginateDto>;
}
