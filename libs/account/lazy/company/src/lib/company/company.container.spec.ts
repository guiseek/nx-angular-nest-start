import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyContainer } from './company.container';

describe('CompanyContainer', () => {
  let component: CompanyContainer;
  let fixture: ComponentFixture<CompanyContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyContainer]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
