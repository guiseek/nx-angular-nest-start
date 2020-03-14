import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompanyForm } from './create-company.form';

describe('CreateCompanyForm', () => {
  let component: CreateCompanyForm;
  let fixture: ComponentFixture<CreateCompanyForm>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCompanyForm ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCompanyForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
