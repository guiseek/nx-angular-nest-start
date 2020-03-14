import { IsString, MaxLength, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString({ always: true })
  @MinLength(4, { always: true })
  @MaxLength(255, { always: true })
  public old: string;

  @IsString({ always: true })
  @MinLength(4, { always: true })
  @MaxLength(255, { always: true })
  public password: string;
}
