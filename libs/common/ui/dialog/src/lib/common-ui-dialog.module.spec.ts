import { async, TestBed } from '@angular/core/testing';
import { CommonUiDialogModule } from './common-ui-dialog.module';

describe('CommonUiDialogModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonUiDialogModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CommonUiDialogModule).toBeDefined();
  });
});
