import { tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { Contact } from './../contact';
import { ContactService } from './../../services/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit, OnDestroy {
  sub: Subscription;
  contact: Contact;
  constructor(private route: ActivatedRoute, private contactService: ContactService, private router: Router) { }

  ngOnInit() {
    console.log('estou no form');
    this.sub = this.route.params.subscribe(
      (params: any) => {
        const id = params['id'];

        this.contact = this.contactService.getContact(id);
      }
    );
  }

  onSubmit(form) {
    this.contactService.
    console.log(form.value); // isso passa o valor do formulário
    this.router.navigate(['/contact', this.contact.id]);
  }

  close() {
    this.router.navigate(['/contact', this.contact.id]);
  }

  ngOnDestroy(): void {
    console.log('form destruido');
  }


  addContact(contact) {

  }

}
