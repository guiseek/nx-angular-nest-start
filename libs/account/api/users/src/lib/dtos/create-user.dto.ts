import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString({ always: true })
  @MaxLength(255, { always: true })
  @IsEmail({ require_tld: false }, { always: true })
  email: string;

  @IsString({ always: true })
  @MinLength(4, { always: true })
  @MaxLength(255, { always: true })
  public password!: string;

  // @IsBoolean({ always: true })
  isActive: boolean;
}
