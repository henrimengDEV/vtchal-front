import {Injectable} from '@angular/core';
import {BookingApiContract} from '../../domain/booking/contract/booking-api.contract';
import {BookingModel, BookingRequest} from '../../domain/booking/model/booking.model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryBookingApiService implements BookingApiContract {
  private bookings: BookingModel[] = [];

  getAll(): BookingModel[] {
    return [...this.bookings];
  }

  create(request: BookingRequest): BookingModel {
    const base = 6;
    const kmRate = request.vehicleType === 'premium' ? 2.6 : request.vehicleType === 'van' ? 2.2 : 1.8;
    const passengersExtra = Math.max(0, request.passengers - 2) * 1.25;
    const optionsExtra = (request.childSeat ? 3 : 0) + (request.extraLuggage ? 4 : 0);
    const roundTripFactor = request.roundTrip ? 1.85 : 1;
    const estimatedPrice = Number(((base + (request.distanceKm * kmRate) + passengersExtra + optionsExtra) * roundTripFactor).toFixed(2));
    const estimatedEtaMinutes = Math.max(8, Math.round(request.distanceKm * 2.8));

    const created: BookingModel = {
      id: `b-${Date.now()}`,
      ...request,
      estimatedPrice,
      estimatedEtaMinutes,
      createdAt: new Date().toISOString()
    };

    this.bookings = [created, ...this.bookings];
    return created;
  }
}
