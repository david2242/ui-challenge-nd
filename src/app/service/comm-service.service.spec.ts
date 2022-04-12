import { TestBed } from '@angular/core/testing';

import { CommServiceService } from './comm-service.service';

describe('CommServiceService', () => {
  let service: CommServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
