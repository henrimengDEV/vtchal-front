import {InjectionToken} from '@angular/core';
import {BookingModel, BookingRequest} from '../model/booking.model';

export interface BookingApiContract {
  create(request: BookingRequest): BookingModel;
  getAll(): BookingModel[];
}

export const BOOKING_API_CONTRACT = new InjectionToken<BookingApiContract>('BOOKING_API_CONTRACT');
