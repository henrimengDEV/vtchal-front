import {Routes} from '@angular/router';
import {ReservationPage} from './presentation/pages/reservation/reservation.page';
import {ReservationForm} from './presentation/pages/reservation/reservation.form/reservation.form';
import {ReservationDetails} from './presentation/pages/reservation/reservation.details/reservation.details';
import {ContactPage} from './presentation/pages/contact/contact.page';
import {FacturePage} from './presentation/pages/facture/facture.page';
import {BookingPage} from './presentation/pages/booking/booking.page';

export const routes: Routes = [
  {path: 'contacts', component: ContactPage},

  {path: 'reservations', component: ReservationPage},
  {path: 'reservations/form', component: ReservationForm},
  {path: 'reservations/:id', component: ReservationDetails},

  {path: 'factures', component: FacturePage},

  {path: 'booking', component: BookingPage},
];
