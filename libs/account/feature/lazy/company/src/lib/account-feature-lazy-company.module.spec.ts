import { async, TestBed } from '@angular/core/testing';
import { AccountFeatureLazyCompanyModule } from './account-feature-lazy-company.module';

describe('AccountFeatureLazyCompanyModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AccountFeatureLazyCompanyModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AccountFeatureLazyCompanyModule).toBeDefined();
  });
});
