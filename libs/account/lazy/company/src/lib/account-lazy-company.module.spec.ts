import { async, TestBed } from '@angular/core/testing';
import { AccountLazyCompanyModule } from './account-lazy-company.module';

describe('AccountLazyCompanyModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AccountLazyCompanyModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AccountLazyCompanyModule).toBeDefined();
  });
});
