import {Component, Inject, inject, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {RESERVATION_API_CONTRACT, ReservationApiContract} from '../../../../domain/reservation/contract/reservation-api.contract';

@Component({
  selector: 'reservation-form',
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './reservation.form.html',
  styleUrl: './reservation.form.css'
})
export class ReservationForm {
  private fb = inject(FormBuilder);
  constructor(@Inject(RESERVATION_API_CONTRACT) private readonly reservationApi: ReservationApiContract) {}
  protected createdReservationId = signal<string | null>(null);

  form = this.fb.nonNullable.group({
    startDate: ['', Validators.required],
    startLocalisation: ['', [Validators.required]],
    destination: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    description: [''],
    suitcaseWarning: [false, [Validators.required]],
    babyWarning: [false, [Validators.required]],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const created = this.reservationApi.create(this.form.getRawValue());
    this.createdReservationId.set(created.id);

    this.form.reset({
      startDate: '',
      startLocalisation: '',
      destination: '',
      phone: '',
      description: '',
      suitcaseWarning: false,
      babyWarning: false
    });
  }
}
