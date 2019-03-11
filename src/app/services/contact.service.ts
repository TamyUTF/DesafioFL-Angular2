import { Contact } from '../contact/contact';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly API = `${environment.API}api/contacts`;

  private contacts: Contact[] = [{
    id: '01',
    firstName: 'Maria',
    lastName: 'Ono',
    email: 'maria@abc.com',
    gender: 'f',
    isFavorite: true,
    info: {
      company: 'Casa',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/souuf/128.jpg',
      address: 'Rua bla bla,123 - centro',
      phone: '1234-5678',
      comments: 'Uma mulher mto legal'
  }}, {id: '02',
  firstName: 'Rioki',
  lastName: 'Ono',
  email: 'maria@abc.com',
  gender: 'f',
  isFavorite: true,
  info: {
    company: 'Casa',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/souuf/128.jpg',
    address: 'Rua bla bla,123 - centro',
    phone: '1234-5678',
    comments: 'Uma mulher mto legal'
  }}];

  constructor(private http: HttpClient) { }

  getContacts() {
    //return this.http.get<Contact[]>(this.API);
    return this.contacts;
  }

  getContact(id: string){
    for (const contact of this.contacts) {
      if (contact.id == id){
        return contact;
      }
    }
  }
//antes de requisitar ao servidor, inicializar um array para consultar, e atualizar a cada add, del e up
  list() {
    this.contacts
    return this.http.get< Contact[] >(this.API)
    .pipe(
      delay(1500),
      tap(console.log));
  }

  deleteContact(id) {

  }

  updateContact(contact: Contact, id) {

  }
}
