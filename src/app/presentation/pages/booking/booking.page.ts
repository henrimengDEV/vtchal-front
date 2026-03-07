import {Component, computed, inject, signal} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {BOOKING_API_CONTRACT, BookingApiContract} from '../../../domain/booking/contract/booking-api.contract';
import {BookingRequest} from '../../../domain/booking/model/booking.model';

@Component({
  selector: 'app-booking.page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './booking.page.html',
  styleUrl: './booking.page.css'
})
export class BookingPage {
  private fb = inject(FormBuilder);
  private bookingApi: BookingApiContract = inject(BOOKING_API_CONTRACT);

  protected submitted = signal(false);
  protected submittedPayload = signal<unknown | null>(null);

  protected form = this.fb.nonNullable.group({
    pickup: ['', Validators.required],
    dropoff: ['', Validators.required],
    pickupDateTime: ['', Validators.required],
    distanceKm: [8, [Validators.required, Validators.min(1), Validators.max(80)]],
    passengers: [1, [Validators.required, Validators.min(1), Validators.max(6)]],
    vehicleType: ['standard', Validators.required],
    paymentMethod: ['card', Validators.required],
    customerName: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^[+0-9()\-\s]{8,20}$/)]],
    notes: [''],
    childSeat: [false],
    extraLuggage: [false],
    roundTrip: [false]
  });

  protected estimatedPrice = computed(() => {
    const value = this.form.getRawValue();
    const base = 6;
    const kmRate = value.vehicleType === 'premium' ? 2.6 : value.vehicleType === 'van' ? 2.2 : 1.8;
    const passengersExtra = Math.max(0, value.passengers - 2) * 1.25;
    const optionsExtra = (value.childSeat ? 3 : 0) + (value.extraLuggage ? 4 : 0);
    const roundTripFactor = value.roundTrip ? 1.85 : 1;

    return ((base + (value.distanceKm * kmRate) + passengersExtra + optionsExtra) * roundTripFactor).toFixed(2);
  });

  protected estimatedEta = computed(() => {
    const km = this.form.controls.distanceKm.value;
    const minutes = Math.max(8, Math.round(km * 2.8));
    return `${minutes} min`;
  });

  protected onSubmit(): void {
    this.submitted.set(true);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const created = this.bookingApi.create(this.form.getRawValue() as BookingRequest);
    this.submittedPayload.set(created);
  }
}
