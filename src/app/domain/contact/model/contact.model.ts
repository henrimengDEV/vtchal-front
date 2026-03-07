export interface ContactModel {
  id: string;
  fullName: string;
  phone: string;
}

export interface CreateContactRequest {
  fullName: string;
  phone: string;
}
