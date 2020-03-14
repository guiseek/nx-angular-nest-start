import { async, TestBed } from '@angular/core/testing';
import { AccountSharedDataAccessModule } from './account-shared-data-access.module';

describe('AccountSharedDataAccessModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AccountSharedDataAccessModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AccountSharedDataAccessModule).toBeDefined();
  });
});
