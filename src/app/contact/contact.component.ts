import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contacts: {};
  constructor() {
    this.contacts = this.getAllContacts();
    console.log(this.contacts);
   }
   async getAllContacts() {
    const res = await fetch('http://contacts-api.azurewebsites.net/api/contacts/');
    const data = await res.json();
    return data;
  }
}
