import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ForgotPasswordDto, User, UsersService } from '@wws/account/api/users';
import { AuthSuccessResponse } from '@wws/api-interfaces';
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
      where: { email }, select: ['id','email','name.first','password']
    });
    console.log(user);

    if (user && user.validatePassword(pass)) {
      const { id, email, name } = user;
      return { id, email, name };
    }
    return null;
  }

  async login({ id, email, name }: Partial<User>): Promise<AuthSuccessResponse> {
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
  async forgotPassword(dto: ForgotPasswordDto) {
    try {
      const { resetPassword, ...data } = await this.usersService.forgotPassword(dto)
      if (resetPassword) {
        await this.mailerService.forgotPassword(
          resetPassword.token, dto.email
        )
        return {
          id: data.id, resetPassword
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
