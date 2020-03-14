import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateCompanyDto, UpdateCompanyDto } from './dtos';
import { Company } from './entities/company';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company) private readonly repo: Repository<Company>
  ) {}

  create(data: CreateCompanyDto) {
    return this.repo.save(data);
  }
  findOne(options: FindOneOptions) {
    return this.repo.findOne(options);
  }
  findMany(options: FindManyOptions) {
    return this.repo.find(options);
  }
  find(options?: FindManyOptions) {
    return this.repo.find(options);
  }
  update(id: number, data: UpdateCompanyDto) {
    return this.repo.update(id, data);
  }
  delete(id: number) {
    return this.repo.delete({ id });
  }
}
