import {Injectable} from '@angular/core';
import {FactureApiContract} from '../../domain/facture/contract/facture-api.contract';
import {CreateFactureRequest, FactureModel} from '../../domain/facture/model/facture.model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryFactureApiService implements FactureApiContract {
  private invoices: FactureModel[] = [
    {
      id: 'f-001',
      userFullName: 'Jean Dupont',
      reservationId: '1',
      amount: 48,
      status: 'sent',
      issuedAt: this.getDateOffset(-2),
      dueAt: this.getDateOffset(5),
      documentName: 'invoice-f-001.pdf',
      documentUrl: null
    },
    {
      id: 'f-002',
      userFullName: 'Louis Garnier',
      reservationId: '7',
      amount: 64,
      status: 'paid',
      issuedAt: this.getDateOffset(-8),
      dueAt: this.getDateOffset(-1),
      documentName: null,
      documentUrl: 'https://example.com/invoices/f-002'
    }
  ];

  getAll(): FactureModel[] {
    return [...this.invoices];
  }

  create(request: CreateFactureRequest): FactureModel {
    const created: FactureModel = {
      id: `f-${Math.floor(Date.now() / 1000)}`,
      userFullName: request.userFullName,
      reservationId: request.reservationId,
      amount: request.amount,
      status: request.status,
      issuedAt: request.issuedAt,
      dueAt: request.dueAt,
      documentName: request.documentName ?? null,
      documentUrl: request.documentUrl ?? null
    };

    this.invoices = [created, ...this.invoices];
    return created;
  }

  remove(id: string): void {
    this.invoices = this.invoices.filter((item) => item.id !== id);
  }

  private getDateOffset(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().slice(0, 10);
  }
}
