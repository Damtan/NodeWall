import { IsAlphanumeric, IsPositive, IsOptional } from "class-validator";

export class PostsQuery {
  @IsPositive()
  @IsOptional()
  limit = 10;

  @IsOptional()
  @IsPositive()
  page = 1;

  @IsOptional()
  @IsAlphanumeric()
  search?: string = null;
}
