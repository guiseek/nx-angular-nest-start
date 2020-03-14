import { async, TestBed } from '@angular/core/testing';
import { AccountFeatureSharedFormsModule } from './account-feature-shared-forms.module';

describe('AccountFeatureSharedFormsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AccountFeatureSharedFormsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AccountFeatureSharedFormsModule).toBeDefined();
  });
});
