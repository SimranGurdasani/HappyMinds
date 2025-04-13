import { TestBed } from '@angular/core/testing';

import { ViewAllTherapistsService } from './view-all-therapists.service';

describe('ViewAllTherapistsService', () => {
  let service: ViewAllTherapistsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewAllTherapistsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
