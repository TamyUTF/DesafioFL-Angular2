import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

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
    console.log('Estou no info component');
    this.subs = this.route.params.pipe(
      map((params: any) => params.id),
      switchMap(id => this.contactService.getContact(id))// retorna o contato
      ).subscribe(contact => this.contact = contact);
  }

  editContact() {
    this.router.navigate(['/contact', this.contact.id, 'edit']);
  }

  deleteContact() {
  }

  close() {
    this.router.navigate(['']);
  }

  ngOnDestroy() {
    console.log('info component foi destruido');
    this.subs.unsubscribe();
  }

}
