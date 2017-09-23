import { TestBed, inject } from '@angular/core/testing';

import { HwidService } from './hwid.service';

describe('HwidService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HwidService]
    });
  });

  it('should be created', inject([HwidService], (service: HwidService) => {
    expect(service).toBeTruthy();
  }));
});
