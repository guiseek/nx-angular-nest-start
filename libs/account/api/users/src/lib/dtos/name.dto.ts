import { IsString } from 'class-validator';

export class NameDto {
  @IsString({ always: true })
  first: string;

  @IsString({ always: true })
  last: string;
}
