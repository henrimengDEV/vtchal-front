import {Component, computed, inject, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {CONTACT_API_CONTRACT, ContactApiContract} from '../../../domain/contact/contract/contact-api.contract';
import {ContactModel} from '../../../domain/contact/model/contact.model';

@Component({
  selector: 'app-contact.page',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.page.html',
  styleUrl: './contact.page.css'
})
export class ContactPage {
  private fb = inject(FormBuilder);
  private contactApi: ContactApiContract = inject(CONTACT_API_CONTRACT);

  protected contacts = signal<ContactModel[]>(this.contactApi.getAll());

  protected search = signal('');
  protected submitted = signal(false);

  protected form = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(/^[+0-9()\-\s]{8,20}$/)]]
  });

  protected filteredContacts = computed(() => {
    const term = this.search().trim().toLowerCase();
    if (!term) {
      return this.contacts();
    }

    return this.contacts().filter((contact) =>
      contact.fullName.toLowerCase().includes(term) || contact.phone.toLowerCase().includes(term)
    );
  });

  protected onSubmit(): void {
    this.submitted.set(true);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    this.contactApi.create({
      fullName: value.fullName,
      phone: value.phone
    });
    this.contacts.set(this.contactApi.getAll());

    this.form.reset({fullName: '', phone: ''});
    this.submitted.set(false);
  }

  protected removeContact(id: string): void {
    this.contactApi.remove(id);
    this.contacts.set(this.contactApi.getAll());
  }

  protected updateSearch(value: string): void {
    this.search.set(value);
  }
}
