import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ContactService } from './../../services/contact.service';
import { Contact } from './../contact';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css'],
  preserveWhitespaces: true
})
export class ContactInfoComponent implements OnInit, OnDestroy {
  subs: Subscription;
  contact: Contact;
  @ViewChild ('modal') modal: HTMLElement;
  constructor(private route: ActivatedRoute, private contactService: ContactService, private router: Router) {

  }


  ngOnInit() {
    this.subs = this.route.params.subscribe(
      (params: any) => {
        const id = params['id'];

        this.contact = this.contactService.getContact(id);
      }
    );
  }

  editContact() {
    this.router.navigate(['/contact', this.contact.id, 'edit']);
  }

  deleteContact() {
    
  }

  outsideClick(event) {
    console.log(this.modal);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
