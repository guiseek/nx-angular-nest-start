import { IsString, MinLength, MaxLength } from 'class-validator';

export class ResetPasswordDto {
  @IsString({ always: true })
  @MinLength(4, { always: true })
  @MaxLength(255, { always: true })
  token: string;

  @IsString({ always: true })
  @MinLength(4, { always: true })
  @MaxLength(255, { always: true })
  password: string;
}
