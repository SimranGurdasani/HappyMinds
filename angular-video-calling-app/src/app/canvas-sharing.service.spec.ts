import { TestBed } from '@angular/core/testing';

import { CanvasSharingService } from './canvas-sharing.service';

describe('CanvasSharingService', () => {
  let service: CanvasSharingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanvasSharingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
