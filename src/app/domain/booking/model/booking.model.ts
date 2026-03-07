export interface BookingRequest {
  pickup: string;
  dropoff: string;
  pickupDateTime: string;
  distanceKm: number;
  passengers: number;
  vehicleType: 'standard' | 'van' | 'premium';
  paymentMethod: 'card' | 'cash' | 'wallet';
  customerName: string;
  phone: string;
  notes: string;
  childSeat: boolean;
  extraLuggage: boolean;
  roundTrip: boolean;
}

export interface BookingModel extends BookingRequest {
  id: string;
  estimatedPrice: number;
  estimatedEtaMinutes: number;
  createdAt: string;
}
