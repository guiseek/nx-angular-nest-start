import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../entities/user';
import { AuthResponse } from '../../interfaces/auth-response.interface';
import { UsersService } from '../users/users.service';
import { AuthMailerService } from './auth-mailer.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailerService: AuthMailerService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findOne({
      where: { email }
    });

    if (user && user.validatePassword(pass)) {
      const { id, email, name } = user;
      return { id, email, name };
    }
    return null;
  }

  async login({ id, email, name }: Partial<User>): Promise<AuthResponse> {
    const payload = { email: email, sub: id };
    return {
      payload: { id, email, name },
      access_token: this.jwtService.sign(payload),
    };
  }
  async getUser(id: number) {
    return await this.usersService.findOne({
      where: { id },
      // relations: ['company']
    })
  }
  async forgotPassword(dto) {
    try {
      const { resetPassword, ...data } = await this.usersService.forgotPassword(dto)
      if (resetPassword) {
        await this.mailerService.forgotPassword(
          resetPassword.token, dto.email
        )
        return {
          ...data, resetPassword
        }
      }
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }
  async resetPassword(dto) {
    try {
      return await this.usersService.resetPassword(dto)
    } catch (err) {
      // return err
      throw new BadRequestException(err.message)
    }
  }
}
