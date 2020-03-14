import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormElement } from './login-form.element';

describe('LoginFormElement', () => {
  let component: LoginFormElement;
  let fixture: ComponentFixture<LoginFormElement>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginFormElement ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormElement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
