import {InjectionToken} from '@angular/core';
import {ContactModel, CreateContactRequest} from '../model/contact.model';

export interface ContactApiContract {
  getAll(): ContactModel[];
  create(request: CreateContactRequest): ContactModel;
  remove(id: string): void;
}

export const CONTACT_API_CONTRACT = new InjectionToken<ContactApiContract>('CONTACT_API_CONTRACT');
