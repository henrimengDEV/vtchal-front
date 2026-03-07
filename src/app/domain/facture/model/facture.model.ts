export type FactureStatus = 'draft' | 'sent' | 'paid';

export interface FactureModel {
  id: string;
  userFullName: string;
  reservationId: string;
  amount: number;
  status: FactureStatus;
  issuedAt: string;
  dueAt: string;
  documentName: string | null;
  documentUrl: string | null;
}

export interface CreateFactureRequest {
  userFullName: string;
  reservationId: string;
  amount: number;
  status: FactureStatus;
  issuedAt: string;
  dueAt: string;
  documentName?: string | null;
  documentUrl?: string | null;
}
