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

  createForm() {
    this.form = this.fBuilder.group({
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
    console.log('estou no form');
    this.sub = this.route.params.subscribe(
      (params: any) => {
        const id = params['id'];
        this.contact = this.contactService.getContact(id); // retorna o contato
      }
    );
  }

  updateContact(id, contact) {

  }

  onSubmit() {
    console.log(this.form);
  }

 /* onSubmit(form) {

    console.log(form.value); // isso passa o valor do formulário

    this.router.navigate(['/contact', this.contact.id]);
  }
*/
close() {
  this.router.navigate(['']);
}

  ngOnDestroy(): void {
    console.log('form destruido');
    this.sub.unsubscribe();
  }


  addContact(contact) {

  }

}
