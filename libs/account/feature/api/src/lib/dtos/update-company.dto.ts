import { IUser } from '@wws/api-interfaces';
// import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';
// import { User } from '../entities/user';

export class UpdateCompanyDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsString({ always: true })
  @MaxLength(100, { always: true })
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @IsOptional()
  domain: string;

  @IsOptional({ always: true })
  @IsString({ always: true })
  description: string;

  @IsOptional()
  // @Type(() => User)
  @ValidateNested({ each: true })
  users: IUser[];
}