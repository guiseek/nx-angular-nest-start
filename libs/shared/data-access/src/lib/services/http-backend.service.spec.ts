import { TestBed } from '@angular/core/testing';

import { HttpBackendService } from './http-backend.service';

describe('HttpBackendService', () => {
  let service: HttpBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
