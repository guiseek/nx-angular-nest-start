import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '@wws/api-interfaces';
import { IsNotEmpty, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';

export class CreateCompanyDto {

  @ApiProperty({
    type: 'string',
    required: true,
    maxLength: 100
  })
  @IsNotEmpty()
  @IsString({ always: true })
  @MaxLength(100, { always: true })
  name: string;

  @ApiProperty({
    type: 'string',
    required: true,
    maxLength: 100
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  domain: string;

  @ApiProperty({
    type: 'string',
    required: false
  })
  @IsOptional({ always: true })
  @IsString({ always: true })
  description: string;

  @ApiProperty({
    type: 'User',
    isArray: true
  })
  // @Type(() => User)
  @ValidateNested({ each: true })
  users: IUser[];
}