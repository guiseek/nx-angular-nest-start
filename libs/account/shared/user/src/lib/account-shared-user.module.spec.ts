import { async, TestBed } from '@angular/core/testing';
import { AccountSharedUserModule } from './account-shared-user.module';

describe('AccountSharedUserModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AccountSharedUserModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AccountSharedUserModule).toBeDefined();
  });
});
