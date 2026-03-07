import {Component, computed, inject, signal} from '@angular/core';
import {ReservationCardComponent} from '../../components/reservation-card/reservation-card.component';
import {ReservationModel} from '../../../domain/reservation/model/reservation.model';
import {RouterLink} from '@angular/router';
import {RESERVATION_API_CONTRACT, ReservationApiContract} from '../../../domain/reservation/contract/reservation-api.contract';

@Component({
  selector: 'reservation-page',
  imports: [
    ReservationCardComponent,
    RouterLink
  ],
  templateUrl: './reservation.page.html',
  styleUrl: './reservation.page.css'
})
export class ReservationPage {
  private reservationApi: ReservationApiContract = inject(RESERVATION_API_CONTRACT);

  protected search = signal('');
  protected statusFilter = signal<'all' | 'todo' | 'in-progress' | 'done'>('all');
  private allReservations = computed<ReservationModel[]>(() => this.reservationApi.getAll());

  protected stats = computed(() => ({
    total: this.allReservations().length,
    todo: this.allReservations().filter((reservation) => reservation.status === 'todo').length,
    inProgress: this.allReservations().filter((reservation) => reservation.status === 'in-progress').length,
    done: this.allReservations().filter((reservation) => reservation.status === 'done').length
  }));

  protected filteredReservations = computed(() => {
    const term = this.search().trim().toLowerCase();
    const status = this.statusFilter();

    return this.allReservations().filter((reservation) => {
      const matchesStatus = status === 'all' || reservation.status === status;
      if (!matchesStatus) {
        return false;
      }

      if (!term) {
        return true;
      }

      return [
        reservation.nomClient,
        reservation.modele,
        reservation.pointDePriseEnCharge,
        reservation.destination,
        reservation.plaqueImmatriculation
      ].some((field) => field.toLowerCase().includes(term));
    });
  });

  protected updateSearch(value: string): void {
    this.search.set(value);
  }

  protected setStatusFilter(value: 'all' | 'todo' | 'in-progress' | 'done'): void {
    this.statusFilter.set(value);
  }
}
