import { async, TestBed } from '@angular/core/testing';
import { AccountFeatureLazyUsersModule } from './account-feature-lazy-users.module';

describe('AccountFeatureLazyUsersModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AccountFeatureLazyUsersModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AccountFeatureLazyUsersModule).toBeDefined();
  });
});
