import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordDialog } from './forgot-password.dialog';

describe('ForgotPasswordDialog', () => {
  let component: ForgotPasswordDialog;
  let fixture: ComponentFixture<ForgotPasswordDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
