import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordDialog } from './reset-password.dialog';

describe('ResetPasswordDialog', () => {
  let component: ResetPasswordDialog;
  let fixture: ComponentFixture<ResetPasswordDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordDialog]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
