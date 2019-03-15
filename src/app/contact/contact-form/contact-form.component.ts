import { tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Contact } from './../contact';
import { ContactService } from './../../services/contact.service';


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit, OnDestroy {
  sub: Subscription;
  contact$: Observable<Contact>;
  form: FormGroup;
  id: string;
  edit: boolean;

  constructor(private route: ActivatedRoute,
              private contactService: ContactService,
              private router: Router,
              private fBuilder: FormBuilder) { }

  createForm() {
    this.form = this.fBuilder.group({
      id:        [null],
      firstName: [null, [Validators.required, Validators.min(3)]],
      lastName:  [null, [Validators.required, Validators.min(3)]],
      email:     [null, [Validators.required, Validators.email]],
      gender:    [null, [Validators.required]],
      info: this.fBuilder.group({
        company:  [null, [Validators.required], Validators.min(3)],
        avatar:   [null],
        address:  [null, Validators.min(3)],
        phone:    [null, [Validators.pattern('^[0-9]*$'), Validators.minLength(8)]],
        comments: [null],
      }),
      isFavorite: [false],
    });
  }

  ngOnInit() {
    this.createForm();
    this.sub = this.route.params.subscribe(
      (params: any) => {
        if (params.id !== undefined) { // é para editar
          this.id = params.id;
          console.log(this.id);
          this.edit = true;
          this.contact$ = this.contactService.getContact(this.id);
          this.sub = this.contact$.subscribe(contact => {
            this.updateForm(contact);
          });
        } else {
          this.edit = false;
        }
      }
    );
  }

  updateForm(contact) {
    console.log('estou aq');
    console.log(contact);
    console.log(this.form.value);
    this.form.patchValue(contact);
    /*this.form.patchValue({
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
    });*/
    console.log('estou aq2');
  }

  onSubmit() {
    this.catchContactData();
  }

close() {
  this.router.navigate(['']);
}

  ngOnDestroy() {
    console.log('form destruido');
    this.sub.unsubscribe();
  }

  catchContactData() {
    const contact: any = {
    id: this.id,
    firstName: this.form.value.firstName,
    lastName: this.form.value.lastName,
    email: this.form.value.email,
    gender: this.form.value.gender,
    isFavorite: false,
    company: this.form.value.info.company,
    avatar: this.form.value.info.avatar,
    address: this.form.value.info.address,
    phone: this.form.value.info.phone,
    comments: this.form.value.info.comments,
  };
    console.log(contact);
    if (this.id !== undefined) {
      this.contactService.updateContact(contact, this.id);
    } else {
      this.contactService.createContact(contact);
    }
  }

}
