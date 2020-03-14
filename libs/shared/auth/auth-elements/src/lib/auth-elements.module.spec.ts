import { async, TestBed } from '@angular/core/testing';
import { AuthElementsModule } from './auth-elements.module';

describe('AuthElementsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AuthElementsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AuthElementsModule).toBeDefined();
  });
});
