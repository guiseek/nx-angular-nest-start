import { IsNotEmpty, IsString, MinLength, MaxLength, IsEmail } from 'class-validator';

export class ForgotPasswordDto {
  @IsNotEmpty()
  @IsString({ always: true })
  @MaxLength(255, { always: true })
  @IsEmail({ require_tld: false }, { always: true })
  email: string;

  @IsString({ always: true })
  @MinLength(4, { always: true })
  @MaxLength(255, { always: true })
  lastPassword?: string;
}
