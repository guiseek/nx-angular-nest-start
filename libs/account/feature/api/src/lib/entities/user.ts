import { Type } from 'class-transformer';
import * as crypto from 'crypto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ConfirmationDto } from '../dtos/confirmation.dto';
import { NameDto } from '../dtos/name.dto';
import { ResetPasswordDto } from '../dtos/reset-password.dto';

export class ResetPassword {
  @Column({ nullable: true })
  token: string;

  @Column({ nullable: true })
  expires: Date;
}
export class Name {
  @Column({ nullable: true, select: true })
  first: string;

  @Column({ nullable: true, select: true })
  last: string;
}
export class Confirmation {
  @Column({
    type: 'text',
    nullable: true,
    name: 'confirmation_code'
  })
  code: string;

  @Column({
    type: 'timestamp',
    nullable: true,
    name: 'confirmation_time'
  })
  time: Date | null;
}


@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Column({
    nullable: false,
    // select: false
  })
  public password!: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Type(t => NameDto)
  @Column(type => Name)
  name: Name;

  @Type(t => ConfirmationDto)
  @Column(type => Confirmation)
  confirmation: Confirmation;

  @Type(t => ResetPasswordDto)
  @Column(type => ResetPassword)
  resetPassword: ResetPassword;

  hashPassword(password: string) {
    return crypto.createHmac('sha256', password).digest('hex');
  }
  validatePassword(password: string) {
    return this.hashPassword(password) === this.password;
  }
}

