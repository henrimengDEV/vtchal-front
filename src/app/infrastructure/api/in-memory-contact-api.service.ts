import {Injectable} from '@angular/core';
import {ContactApiContract} from '../../domain/contact/contract/contact-api.contract';
import {ContactModel, CreateContactRequest} from '../../domain/contact/model/contact.model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryContactApiService implements ContactApiContract {
  private contacts: ContactModel[] = [
    {id: '1', fullName: 'Chalana Dupont', phone: '+33 6 12 34 56 78'},
    {id: '2', fullName: 'Emma Martin', phone: '+33 6 98 76 54 32'},
    {id: '3', fullName: 'Leo Bernard', phone: '+33 7 11 22 33 44'}
  ];

  getAll(): ContactModel[] {
    return [...this.contacts];
  }

  create(request: CreateContactRequest): ContactModel {
    const created: ContactModel = {
      id: crypto.randomUUID(),
      fullName: request.fullName.trim(),
      phone: request.phone.trim()
    };

    this.contacts = [created, ...this.contacts];
    return created;
  }

  remove(id: string): void {
    this.contacts = this.contacts.filter((item) => item.id !== id);
  }
}
