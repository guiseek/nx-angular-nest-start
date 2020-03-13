import { Test, TestingModule } from '@nestjs/testing';
import { AuthMailerService } from './auth-mailer.service';

describe('AuthMailerService', () => {
  let service: AuthMailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthMailerService],
    }).compile();

    service = module.get<AuthMailerService>(AuthMailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
