import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ReservationCardComponent} from '../../../components/reservation-card/reservation-card.component';
import {ReservationModel} from '../../../../domain/reservation/model/reservation.model';
import {RESERVATION_API_CONTRACT, ReservationApiContract} from '../../../../domain/reservation/contract/reservation-api.contract';

@Component({
  selector: 'app-reservation.details',
  imports: [
    ReservationCardComponent,
    RouterLink
  ],
  templateUrl: './reservation.details.html',
  styleUrl: './reservation.details.css'
})
export class ReservationDetails {
  private reservationApi: ReservationApiContract = inject(RESERVATION_API_CONTRACT);

  protected id: string | null = inject(ActivatedRoute).snapshot.paramMap.get('id');
  reservation = signal<ReservationModel | undefined>(this.id ? this.reservationApi.getById(this.id) : undefined);
}
