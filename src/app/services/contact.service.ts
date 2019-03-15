import { Contact } from '../contact/contact';
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, delay, map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Subscription, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService implements OnDestroy {
  private readonly API = `${environment.API}api/contacts`;
  private contacts$: Observable<Contact[]>;
  contacts: Contact[];
  private subs: Subscription;

  constructor(private http: HttpClient) { }

  getContacts() {
    return this.contacts;
  }

  getContact(id: any) {
    console.log(`${this.API}/${id}`);
    return this.http.get<Contact>((`${this.API}/${id}`)).pipe(take(1));
  }

  list() {
    return this.http.get<Contact[]>(this.API)
    .pipe(
      delay(2000));
  }

  deleteContact(id) {
    this.http.delete(`${this.API}/${id}`).pipe(take(1)).subscribe(console.log,
      error => console.error('Ocorreu um erro' + error)
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  updateContact(contact, id: string) {
    console.log('estou no update');
    console.log(contact);
    this.http.put(`${this.API}/${id}`, contact).pipe(take(1)).subscribe(
      res => console.log(res),
      error => console.log(error)
    );
  }

  createContact(contact) {
    console.log('estou no create');
    this.subs = this.http.post(this.API, contact).subscribe(
      res => console.log(res),
      error => console.error('Ocorreu um erro' + error)
    );
  }
}
