import { tap, map } from 'rxjs/operators';
import { ContactService } from '../services/contact.service';
import { Component, OnInit } from '@angular/core';
import { Contact } from './contact';
import { Observable } from '../../../node_modules/rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) { }
  contacts$: Observable<Contact[]>;



  openModal(id){

  }

  showInfo(contact ) {
    this.router.navigate(['/contact', contact]);
  }

  ngOnInit() {
    this.contacts$ = this.contactService.list();
    this.contacts$.subscribe(data => this.contactService.contacts = data);
  }
}
