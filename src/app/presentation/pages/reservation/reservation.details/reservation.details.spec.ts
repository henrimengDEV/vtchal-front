import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationDetails } from './reservation.details';

describe('ReservationDetails', () => {
  let component: ReservationDetails;
  let fixture: ComponentFixture<ReservationDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
