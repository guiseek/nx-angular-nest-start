import { async, TestBed } from '@angular/core/testing';
import { AccountLazyAuthModule } from './account-lazy-auth.module';

describe('AccountLazyAuthModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AccountLazyAuthModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AccountLazyAuthModule).toBeDefined();
  });
});
