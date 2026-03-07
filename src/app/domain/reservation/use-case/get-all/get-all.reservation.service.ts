import {Inject, Injectable} from '@angular/core';
import {
  RESERVATION_API_CONTRACT,
  ReservationApiContract
} from '../../contract/reservation-api.contract';
import {ReservationModel} from '../../model/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class GetAllReservationService {
  constructor(@Inject(RESERVATION_API_CONTRACT) private readonly reservationApi: ReservationApiContract) {}

  execute(): ReservationModel[] {
    return this.reservationApi.getAll();
  }
}
