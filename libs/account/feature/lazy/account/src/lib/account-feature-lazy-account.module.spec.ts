import { async, TestBed } from '@angular/core/testing';
import { AccountFeatureLazyAccountModule } from './account-feature-lazy-account.module';

describe('AccountFeatureLazyAccountModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AccountFeatureLazyAccountModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AccountFeatureLazyAccountModule).toBeDefined();
  });
});
