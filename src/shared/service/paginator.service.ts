import { IPaginatorService } from "../interface/paginator.interface";
import { PaginateDto } from "../dto/paginate.dto";
import { Document, DocumentQuery } from "mongoose";
import { plainToClass } from "class-transformer";
import { injectable } from "inversify";
import { ClassType } from "class-transformer/ClassTransformer";
import { EntityInterface } from "../interface/entity.interface";

@injectable()
export class PaginatorService implements IPaginatorService {
  public async paginate(
    entityClass: ClassType<EntityInterface>,
    query: DocumentQuery<Document[], Document, {}>,
    page: number,
    limit: number
  ): Promise<PaginateDto> {
    const items = await query
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const paginateDto = new PaginateDto();
    paginateDto.limit = limit;
    paginateDto.page = page;
    paginateDto.count = await query.skip(0).limit(0).count().exec();
    paginateDto.items = [];
    paginateDto.pages = Math.ceil(paginateDto.count / limit) || 1;

    if (items.length) {
      items
        .map(function (post: any) {
          return post.toObject();
        })
        .forEach(function (item: string) {
          paginateDto.items.push(
            plainToClass(entityClass, item, { strategy: "excludeAll" })
          );
        });
    }

    return new Promise((resolve, reject) => {
      resolve(paginateDto);
    });
  }
}
