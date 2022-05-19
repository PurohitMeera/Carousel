import { TestBed } from '@angular/core/testing';

import { ProductDataUtilService } from './product-data-util.service';

describe('ProductDataUtilService', () => {
  let service: ProductDataUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductDataUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
