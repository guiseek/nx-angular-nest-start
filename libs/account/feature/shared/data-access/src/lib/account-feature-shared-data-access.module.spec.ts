import { async, TestBed } from '@angular/core/testing';
import { AccountFeatureSharedDataAccessModule } from './account-feature-shared-data-access.module';

describe('AccountFeatureSharedDataAccessModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AccountFeatureSharedDataAccessModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AccountFeatureSharedDataAccessModule).toBeDefined();
  });
});
