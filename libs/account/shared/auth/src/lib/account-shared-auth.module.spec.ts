import { async, TestBed } from '@angular/core/testing';
import { AccountSharedAuthModule } from './account-shared-auth.module';

describe('AccountSharedAuthModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AccountSharedAuthModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AccountSharedAuthModule).toBeDefined();
  });
});
