import { tap } from 'rxjs/operators';
import { ContactService } from '../services/contact.service';
import { Component, OnInit } from '@angular/core';
import { Contact } from './contact';
import { Observable } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  //contacts$: Observable<Contact[]>;
  contacts: Contact[];
  constructor(private contactService: ContactService) {

  }

  contactInfo(contact){

  }

  ngOnInit() {
    //this.contacts$ = this.contactService.list();
    this.contacts = this.contactService.getContacts();
    console.log('estou no contact component');
  }
}
