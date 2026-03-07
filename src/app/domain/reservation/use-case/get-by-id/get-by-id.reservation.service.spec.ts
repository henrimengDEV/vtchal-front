import { TestBed } from '@angular/core/testing';

import { GetByIdReservationService } from './get-by-id.reservation.service';

describe('GetByIdReservationService', () => {
  let service: GetByIdReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetByIdReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
