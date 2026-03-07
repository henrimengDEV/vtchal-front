import {InjectionToken} from '@angular/core';
import {CreateReservationRequest} from '../model/reservation-create.model';
import {ReservationModel} from '../model/reservation.model';

export interface ReservationApiContract {
  getAll(): ReservationModel[];
  getById(id: string): ReservationModel | undefined;
  create(request: CreateReservationRequest): ReservationModel;
}

export const RESERVATION_API_CONTRACT = new InjectionToken<ReservationApiContract>('RESERVATION_API_CONTRACT');
