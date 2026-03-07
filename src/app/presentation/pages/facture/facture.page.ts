import {Component, computed, inject, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {RESERVATION_API_CONTRACT, ReservationApiContract} from '../../../domain/reservation/contract/reservation-api.contract';
import {ReservationModel} from '../../../domain/reservation/model/reservation.model';
import {FACTURE_API_CONTRACT, FactureApiContract} from '../../../domain/facture/contract/facture-api.contract';
import {FactureModel, FactureStatus} from '../../../domain/facture/model/facture.model';

@Component({
  selector: 'app-facture.page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './facture.page.html',
  styleUrl: './facture.page.css'
})
export class FacturePage {
  private fb = inject(FormBuilder);
  private reservationApi: ReservationApiContract = inject(RESERVATION_API_CONTRACT);
  private factureApi: FactureApiContract = inject(FACTURE_API_CONTRACT);

  protected reservations = signal<ReservationModel[]>(this.reservationApi.getAll());
  protected invoices = signal<FactureModel[]>(this.factureApi.getAll());

  protected submitted = signal(false);
  protected selectedFileName = signal<string | null>(null);
  protected search = signal('');
  protected statusFilter = signal<'all' | FactureStatus>('all');

  protected users = computed(() =>
    [...new Set(this.reservations().map((reservation) => reservation.nomClient))].sort((a, b) => a.localeCompare(b))
  );

  protected form = this.fb.nonNullable.group({
    userFullName: [this.users()[0] ?? '', Validators.required],
    reservationId: ['', Validators.required],
    amount: [35, [Validators.required, Validators.min(1)]],
    status: ['draft' as FactureStatus, Validators.required],
    issuedAt: [this.getDateOffset(0), Validators.required],
    dueAt: [this.getDateOffset(7), Validators.required],
    documentUrl: ['']
  });

  protected reservationOptions = computed(() => {
    const user = this.form.controls.userFullName.value;
    return this.reservations().filter((reservation) => reservation.nomClient === user);
  });

  protected filteredInvoices = computed(() => {
    const term = this.search().trim().toLowerCase();
    const status = this.statusFilter();

    return this.invoices().filter((invoice) => {
      const statusMatch = status === 'all' || invoice.status === status;
      if (!statusMatch) return false;

      if (!term) return true;

      return [invoice.id, invoice.userFullName, invoice.reservationId]
        .some((field) => field.toLowerCase().includes(term));
    });
  });

  protected onUserChange(value: string): void {
    this.form.controls.userFullName.setValue(value);

    const availableReservations = this.reservations().filter((reservation) => reservation.nomClient === value);
    const currentReservation = this.form.controls.reservationId.value;
    if (!availableReservations.some((reservation) => reservation.id === currentReservation)) {
      this.form.controls.reservationId.setValue('');
    }
  }

  protected onReservationChange(value: string): void {
    this.form.controls.reservationId.setValue(value);
    const reservation = this.reservations().find((item) => item.id === value);
    if (reservation) {
      this.form.controls.userFullName.setValue(reservation.nomClient);
    }
  }

  protected onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedFileName.set(target.files?.[0]?.name ?? null);
  }

  protected onSubmit(): void {
    this.submitted.set(true);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const reservation = this.reservations().find((item) => item.id === value.reservationId);

    if (!reservation || reservation.nomClient !== value.userFullName) {
      return;
    }

    const documentUrl = value.documentUrl.trim();
    this.factureApi.create({
      userFullName: value.userFullName,
      reservationId: value.reservationId,
      amount: value.amount,
      status: value.status,
      issuedAt: value.issuedAt,
      dueAt: value.dueAt,
      documentName: this.selectedFileName(),
      documentUrl: documentUrl ? documentUrl : null
    });

    this.invoices.set(this.factureApi.getAll());

    this.form.reset({
      userFullName: this.users()[0] ?? '',
      reservationId: '',
      amount: 35,
      status: 'draft',
      issuedAt: this.getDateOffset(0),
      dueAt: this.getDateOffset(7),
      documentUrl: ''
    });

    this.selectedFileName.set(null);
    this.submitted.set(false);
  }

  protected removeInvoice(id: string): void {
    this.factureApi.remove(id);
    this.invoices.set(this.factureApi.getAll());
  }

  protected updateSearch(value: string): void {
    this.search.set(value);
  }

  protected setStatusFilter(value: 'all' | FactureStatus): void {
    this.statusFilter.set(value);
  }

  protected statusLabel(status: FactureStatus): string {
    if (status === 'draft') return 'Draft';
    if (status === 'sent') return 'Sent';
    return 'Paid';
  }

  protected statusClass(status: FactureStatus): string {
    return `facture-page__badge facture-page__badge--${status}`;
  }

  private getDateOffset(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().slice(0, 10);
  }
}
