import { async, TestBed } from '@angular/core/testing';
import { CommonUiTableModule } from './common-ui-table.module';

describe('CommonUiTableModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonUiTableModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CommonUiTableModule).toBeDefined();
  });
});
