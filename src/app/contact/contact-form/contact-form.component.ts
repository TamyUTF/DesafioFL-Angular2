import { tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Contact } from './../contact';
import { ContactService } from './../../services/contact.service';


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit, OnDestroy {
  sub: Subscription;
  contact: Observable<Contact>;
  constructor(private route: ActivatedRoute,
              private contactService: ContactService,
              private router: Router,
              private fBuilder: FormBuilder) { }
  form: FormGroup;
  id: any;

  createForm() {
    this.form = this.fBuilder.group({
      id:        [null],
      firstName: [null],
      lastName:  [null],
      email:     [null],
      gender:    [null],
      info: this.fBuilder.group({
        company:  [null],
        avatar:   [null],
        address:  [null],
        phone:    [null],
        comments: [null]
      })
    });
  }

  ngOnInit() {
    this.createForm();
    this.sub = this.route.params.subscribe(
      (params: any) => {
        this.id = params.id;
        const contact$ = this.contactService.getContact(this.id); // retorna o contato
        if (contact$) { // se existe é um edit
          contact$.subscribe(contact => {
            this.updateForm(contact);
          });
        }
      }
    );
  }

  updateForm(contact) {
    this.form.patchValue({
      id: contact.id,
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      gender: contact.gender,
      info: {
        company: contact.info.company,
        avatar: contact.info.avatar,
        address: contact.info.address,
        phone: contact.info.phone,
        comments: contact.info.comments
      }
    });

  }

  updateContact(id, contact) {

  }

  createContact(contact) {

  }

  onSubmit() {
    if (this.id !== null) {
      this.updateContact( this.id, JSON.stringify(this.form.value));
    } else {
      this.createContact(JSON.stringify(this.form.value));
    }
  }


 /* onSubmit(form) {

    console.log(form.value); // isso passa o valor do formulário

    this.router.navigate(['/contact', this.contact.id]);
  }
*/
close() {
  this.router.navigate(['']);
}

  ngOnDestroy() {
    console.log('form destruido');
    this.sub.unsubscribe();
  }


  addContact(contact) {

  }
}
