import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { ChangePasswordDto } from '../../dtos/change-password.dto';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  async post(@Body() data: CreateUserDto) {
    try {
      return await this.service.create(data);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
  @UseGuards(AuthGuard('jwt'))
  @Get()
  get() { return this.service.find(); }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id/change-password')
  async changePassword(
    @Param('id') id: string,
    @Body() data: ChangePasswordDto
  ) {
    try {
      return await this.service.changePassword(id, data);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
