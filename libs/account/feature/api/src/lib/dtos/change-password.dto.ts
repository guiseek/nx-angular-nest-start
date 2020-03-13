import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  old: string;

  @IsNotEmpty()
  @IsString({ always: true })
  @MinLength(4, { always: true })
  @MaxLength(255, { always: true })
  password: string;
}