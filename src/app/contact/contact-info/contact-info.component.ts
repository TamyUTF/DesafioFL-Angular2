import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ContactService } from './../../services/contact.service';
import { Contact } from './../contact';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit, OnDestroy {
  subs: Subscription;
  contact: Contact;

  constructor(private route: ActivatedRoute, private contactService: ContactService) {

  }

  ngOnInit() {
    this.subs = this.route.params.subscribe(
      (params: any) => {
        let id = params['id'];

        this.contact = this.contactService.getContact(id);
      }
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
