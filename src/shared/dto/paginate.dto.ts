import { EntityInterface } from "../interface/entity.interface";

export class PaginateDto {
  public items: Array<EntityInterface>;
  public count: number;
  public page: number;
  public limit: number;
  public pages: number;
}
