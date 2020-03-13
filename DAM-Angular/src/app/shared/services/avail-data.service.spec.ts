import { TestBed, inject } from '@angular/core/testing';

import { AvailDataService } from './avail-data.service';

describe('AvailDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AvailDataService]
    });
  });

  it('should be created', inject([AvailDataService], (service: AvailDataService) => {
    expect(service).toBeTruthy();
  }));
});
