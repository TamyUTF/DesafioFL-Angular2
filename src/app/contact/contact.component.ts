import { ContactService } from './contact.service';
import { Component, OnInit } from '@angular/core';
import { Contact } from './contact';
import { Observable } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contacts$: Observable<Contact[]>;

  constructor(private contactService: ContactService) {

  }

  ngOnInit() {
    this.contacts$ = this.contactService.list();
    console.log('estou no contact component');
  }
}
