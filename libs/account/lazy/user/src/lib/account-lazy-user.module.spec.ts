import { async, TestBed } from '@angular/core/testing';
import { AccountLazyUserModule } from './account-lazy-user.module';

describe('AccountLazyUserModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AccountLazyUserModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AccountLazyUserModule).toBeDefined();
  });
});
