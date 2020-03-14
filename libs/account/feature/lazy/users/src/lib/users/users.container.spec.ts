import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersContainer } from './users.container';

describe('UsersContainer', () => {
  let component: UsersContainer;
  let fixture: ComponentFixture<UsersContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
