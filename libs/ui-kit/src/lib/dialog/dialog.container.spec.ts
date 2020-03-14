import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContainer } from './dialog.container';

describe('DialogContainer', () => {
  let component: DialogContainer;
  let fixture: ComponentFixture<DialogContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogContainer]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
