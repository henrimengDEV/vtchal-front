export interface CreateReservationRequest {
  startDate: string;
  startLocalisation: string;
  destination: string;
  phone: string;
  description?: string | null;
  suitcaseWarning: boolean;
  babyWarning: boolean;
}
