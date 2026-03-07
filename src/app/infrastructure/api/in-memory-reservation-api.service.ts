import {Injectable} from '@angular/core';
import {ReservationApiContract} from '../../domain/reservation/contract/reservation-api.contract';
import {CreateReservationRequest} from '../../domain/reservation/model/reservation-create.model';
import {mockReservations, ReservationModel} from '../../domain/reservation/model/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryReservationApiService implements ReservationApiContract {
  private reservations: ReservationModel[] = [...mockReservations];

  getAll(): ReservationModel[] {
    const statusPriority: Record<ReservationModel['status'], number> = {
      'in-progress': 0,
      'todo': 1,
      'done': 2
    };

    return [...this.reservations].sort((a, b) => statusPriority[a.status] - statusPriority[b.status]);
  }

  getById(id: string): ReservationModel | undefined {
    return this.reservations.find((item) => item.id === id);
  }

  create(request: CreateReservationRequest): ReservationModel {
    const nextId = String(this.reservations.length + 1);

    const created: ReservationModel = {
      id: nextId,
      modele: 'Tesla Model 3',
      motorisation: 'Electrique',
      couleursVoiture: ['noir'],
      plaqueImmatriculation: `ZZ-${(100 + this.reservations.length).toString().slice(-3)}-AA`,
      nomClient: request.phone,
      pointDePriseEnCharge: request.startLocalisation,
      destination: request.destination,
      nombreDePersonnes: request.babyWarning ? 2 : 1,
      bagages: request.suitcaseWarning ? ['valise'] : [],
      status: 'todo'
    };

    this.reservations = [created, ...this.reservations];
    return created;
  }
}
