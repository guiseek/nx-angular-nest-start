import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@wws/account/api/auth';
import { User as UserEntity } from '@wws/account/api/users';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto, UpdateCompanyDto } from './dtos';

@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly service: CompaniesService) {}

  @Post()
  async post(@Body() data: CreateCompanyDto) {
    try {
      return await this.service.create(data);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
  @Get()
  get() {
    return this.service.find({
      relations: ['users']
    });
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.service.findOne({ where: { id }, relations: ['users'] });
  }

  @Get('my')
  my(@User() user: UserEntity) {

    console.log('my: ', user);

    return this.service.findMany({
    })

  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: UpdateCompanyDto) {
    try {
      return await this.service.update(id, data);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
