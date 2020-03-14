import { IsDateString, IsString } from 'class-validator';

export class ConfirmationDto {

  @IsString()
  code?: string;

  @IsDateString()
  time?: Date | null;
}