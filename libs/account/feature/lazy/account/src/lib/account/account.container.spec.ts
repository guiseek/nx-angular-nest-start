import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountContainer } from './account.container';

describe('AccountContainer', () => {
  let component: AccountContainer;
  let fixture: ComponentFixture<AccountContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
