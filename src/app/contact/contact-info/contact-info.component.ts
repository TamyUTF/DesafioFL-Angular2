import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';

import { ContactService } from './../../services/contact.service';
import { Contact } from './../contact';
import { MyDialogComponent } from './../../services/my-dialog/my-dialog.component';
import { ContactComponent } from './../contact.component';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css'],
  preserveWhitespaces: true
})

export class ContactInfoComponent implements OnInit, OnDestroy {
  subs: Subscription;
  subsFav: Subscription;
  contact: Contact;
  contactAux: Contact;
  favAux: boolean;
  id: string;

  @ViewChild ('modal') modal: HTMLElement;
  constructor(private route: ActivatedRoute,
              private contactService: ContactService,
              private router: Router,
              private dialog: MatDialog,
              private contactC: ContactComponent) {
  this.favAux = false;
  }
  ngOnInit() {
    console.log('Estou no info component');
    this.subs = this.route.params.pipe(
      map((params: any) => {
        this.id = params.id;
        console.log(this.id);
      }),
      switchMap(id => this.contactService.getContact(this.id))// retorna o contato
      ).subscribe(contact => {this.contact = contact;
                              this.favAux = contact.isFavorite;
                            }
        );
  }

  editContact() {
    this.router.navigate(['/contact', this.contact.id, 'edit']);
  }

  deleteContact() {
    const dialogRef = this.dialog.open(MyDialogComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {

      console.log(result);
      if (result === 'true') {
        console.log(result);
        this.contactService.deleteContact(this.id);
        this.contactC.load(this.contactService.list());
        this.close();
      }
    });
  }

favorite(event) {
  if (event.checked) { // favoritou
    this.contactService.getContact(this.id)
      .subscribe(c => {
        c.isFavorite = !c.isFavorite;
        this.contactAux = c;
        this.contactService.updateContact(this.transformContact(c), this.id);
        this.contactC.load(this.contactService.list());
      });
  } else {
    this.contactService.getContact(this.id)
      .subscribe(c => {
        c.isFavorite = !c.isFavorite;
        this.contactAux = c;
        this.contactService.updateContact(this.transformContact(c), this.id);
        this.contactC.load(this.contactService.list());
      });
  }
  }

  transformContact(c) {
    const contact: any = {
      id: c.id,
      firstName: c.firstName,
      lastName: c.lastName,
      email: c.email,
      gender: c.gender,
      isFavorite: c.isFavorite,
      company: c.info.company,
      avatar: c.info.avatar,
      address: c.info.address,
      phone: c.info.phone,
      comments: c.info.comments,
    };
    return contact;
  }

  close() {
    this.router.navigate(['']);
  }

  ngOnDestroy() {
    console.log('info component foi destruido');
    this.contact = undefined;
    this.subs.unsubscribe();
  }

}
