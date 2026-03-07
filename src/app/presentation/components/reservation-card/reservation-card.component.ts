import {Component, input} from '@angular/core';
import {ReservationModel} from '../../../domain/reservation/model/reservation.model';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'reservation-card',
  imports: [
    RouterLink
  ],
  templateUrl: './reservation-card.component.html',
  styleUrl: './reservation-card.component.css'
})
export class ReservationCardComponent {
  reservation = input.required<ReservationModel>();

  protected statusLabel(status: ReservationModel['status']): string {
    if (status === 'todo') return 'To do';
    if (status === 'in-progress') return 'In progress';
    return 'Done';
  }
}
