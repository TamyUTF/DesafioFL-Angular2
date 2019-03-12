import { Contact } from '../contact/contact';
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, delay, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Subscription, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService implements OnDestroy {
  private readonly API = `${environment.API}api/contacts`;
  private contacts$: Observable<Contact[]>;
  private subs: Subscription;

  constructor(private http: HttpClient) { }

  getContacts() {
    this.contacts$ = this.http.get<Contact[]>((this.API));
  }

  getContact(id: any) {
    console.log(`${this.API}/${id}`);
    return this.http.get<Contact>((`${this.API}/${id}`));
  }

  list() {
    return this.http.get< Contact[] >(this.API)
    .pipe(
      delay(2000),
      tap(console.log));
  }

  deleteContact(id) {

  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  updateContact(contact: Contact, id) {
    this.contacts.push(id, contact);
  }
}
