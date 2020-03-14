import { async, TestBed } from '@angular/core/testing';
import { AccountFeatureSharedAuthModule } from './account-feature-shared-auth.module';

describe('AccountFeatureSharedAuthModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AccountFeatureSharedAuthModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AccountFeatureSharedAuthModule).toBeDefined();
  });
});
