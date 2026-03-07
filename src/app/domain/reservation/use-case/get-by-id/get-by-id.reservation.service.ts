import {Inject, Injectable} from '@angular/core';
import {
  RESERVATION_API_CONTRACT,
  ReservationApiContract
} from '../../contract/reservation-api.contract';
import {ReservationModel} from '../../model/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class GetByIdReservationService {
  constructor(@Inject(RESERVATION_API_CONTRACT) private readonly reservationApi: ReservationApiContract) {}

  execute(id: string | null): ReservationModel | undefined {
    return id ? this.reservationApi.getById(id) : undefined;
  }
}
