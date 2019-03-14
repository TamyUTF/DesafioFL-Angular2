import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { ContactService } from './../../services/contact.service';
import { Contact } from './../contact';
import { MyDialogComponent } from './../../services/my-dialog/my-dialog.component';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css'],
  preserveWhitespaces: true
})

export class ContactInfoComponent implements OnInit, OnDestroy {
  subs: Subscription;
  contact: Contact;
  id: string;

  @ViewChild ('modal') modal: HTMLElement;
  constructor(private route: ActivatedRoute,
              private contactService: ContactService,
              private router: Router,
              private dialog: MatDialog) {

  }
  ngOnInit() {
    console.log('Estou no info component');
    this.subs = this.route.params.pipe(
      map((params: any) => {
        this.id = params.id;
      }),
      switchMap(id => this.contactService.getContact(this.id))// retorna o contato
      ).subscribe(contact => this.contact = contact);
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
      }
    });
  }

  close() {
    this.router.navigate(['']);
  }

  ngOnDestroy() {
    console.log('info component foi destruido');
    this.subs.unsubscribe();
  }

}
