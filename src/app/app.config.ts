import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {RESERVATION_API_CONTRACT} from './domain/reservation/contract/reservation-api.contract';
import {InMemoryReservationApiService} from './infrastructure/api/in-memory-reservation-api.service';
import {CONTACT_API_CONTRACT} from './domain/contact/contract/contact-api.contract';
import {InMemoryContactApiService} from './infrastructure/api/in-memory-contact-api.service';
import {BOOKING_API_CONTRACT} from './domain/booking/contract/booking-api.contract';
import {InMemoryBookingApiService} from './infrastructure/api/in-memory-booking-api.service';
import {FACTURE_API_CONTRACT} from './domain/facture/contract/facture-api.contract';
import {InMemoryFactureApiService} from './infrastructure/api/in-memory-facture-api.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {provide: RESERVATION_API_CONTRACT, useExisting: InMemoryReservationApiService},
    {provide: CONTACT_API_CONTRACT, useExisting: InMemoryContactApiService},
    {provide: BOOKING_API_CONTRACT, useExisting: InMemoryBookingApiService},
    {provide: FACTURE_API_CONTRACT, useExisting: InMemoryFactureApiService}
  ]
};
