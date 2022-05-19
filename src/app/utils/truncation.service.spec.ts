import { TestBed } from '@angular/core/testing';

import { TruncationService } from './truncation.service';

describe('TruncationService', () => {
  let service: TruncationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TruncationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
