import { Injectable, OnDestroy, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, delay, map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Subscription, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';

import { Contact } from '../contact/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService implements OnDestroy {
  private readonly API = `${environment.API}api/contacts`;
  event = new EventEmitter();
  contacts$: Observable<Contact[]>;
  contacts: Contact[];
  contact: Contact;
  private subs: Subscription;

constructor(private http: HttpClient,
            private snackbar: MatSnackBar) { }

getContacts() {
  return this.contacts;
}

setContact(c) {
  this.contact.id = c.id;
  this.contact.firstName = c.value.firstName;
  this.contact.lastName = c.value.lastName;
  this.contact.email = c.value.email;
  this.contact.gender = c.value.gender;
  this.contact.isFavorite = c.isFavorite;
  this.contact.info.company = c.value.info.company;
  this.contact.info.avatar = c.value.info.avatar;
  this.contact.info.address = c.value.info.address;
  this.contact.info.phone = c.value.info.phone;
  this.contact.info.comments = c.value.info.comments;
}

getContact(id: any) {
  return this.http.get<Contact>((`${this.API}/${id}`)).pipe(take(1),
  delay(500));
}

list() {
  this.contacts$ = this.http.get<any[]>(this.API)
  .pipe(
    delay(200));
}

deleteContact(id) {
  this.http.delete(`${this.API}/${id}`).pipe(take(1)).subscribe(res => {
    console.log(res);
    this.event.emit();
    this.list();
    this.openSnackBar('Contato deletado com sucesso!', 'Uhul!');
  },
  error => {
    console.error('Ocorreu um erro' + error);
    this.openSnackBar('Ops! Ocorreu um erro.', 'Noo! :(');
  }
  );
}

ngOnDestroy() {
  this.subs.unsubscribe();
}

public updateContact(contact: Contact, id: string) {
  return this.http.put(`${this.API}/${id}`, contact);
}

createContact(contact) {
  return this.http.post(this.API, contact);
}

openSnackBar(msg, action) {
  this.snackbar.open(msg, action, {
    duration: 5000,
  });
}

}
