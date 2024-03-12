import { Transform } from "class-transformer";
import {
  IsArray,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
} from "class-validator";

enum Order {
  ASC = "asc",
  DESC = "desc",
}
export class FindQueryDto {
  @IsNumberString()
  @IsOptional()
  skip?: number;
  @IsNumberString()
  @IsOptional()
  take?: number;
  @IsArray()
  @IsOptional()
  @Transform((params) =>
    Array.isArray(params.value) ? params.value : [params.value],
  )
  select?: string[];
  @IsArray()
  @IsOptional()
  @Transform((params) =>
    Array.isArray(params.value) ? params.value : [params.value],
  )
  where?: string[];
  @IsArray()
  @IsOptional()
  @Transform((params) =>
    Array.isArray(params.value) ? params.value : [params.value],
  )
  relations?: string[];
  @IsString()
  @IsOptional()
  orderField?: string;

  @IsEnum(Order)
  @IsOptional()
  order?: Order;
}
