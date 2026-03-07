import { TestBed } from '@angular/core/testing';

import { GetAllReservationService } from './get-all.reservation.service';

describe('GetAllReservationService', () => {
  let service: GetAllReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
