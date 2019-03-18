import { tap, map, filter, switchMap, debounceTime } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from '../../../node_modules/rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

import { ContactService } from '../services/contact.service';
import { Contact } from './contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) { }
@ViewChild('toggle') toggle;
search = new FormControl('');
contacts$: Observable<Contact[]>;
contacts: Contact[];
searchUpdated: Subject<any> = new Subject();
favAux: false;
pageIndex = 0;
pageSize = 6;
startIndex = 0;
endIndex = 6;

showInfo(contact ) {
  this.router.navigate(['/contact', contact]);
}

ngOnInit() {
  this.contactService.list();
  this.eventListener();
}

eventListener() {
  this.contactService.event.subscribe(event => this.load());
}

load() {
  this.contactService.list();
  this.pageIndex = 0;
  this.pageSize = 6;
  this.startIndex = 0;
  this.endIndex = 6;
}

eventKeyup() {
  this.search.valueChanges.pipe(debounceTime(500));
  if (this.toggle.checked) { // lista dentro dos favoritos
    this.contactService.contacts$ = this.contactService.contacts$.pipe(
      map(contact => contact.filter(searchContact =>
      searchContact.firstName.toLowerCase().includes(this.search.value.toLowerCase()))
    ));
  } else {
    this.contactService.contacts$ = this.contactService.contacts$.pipe(
      map(contact => contact.filter(searchContact =>
        searchContact.firstName.toLowerCase().includes(this.search.value.toLowerCase()))
    ));
  }
}

getFavorites(event) {
  if (event.checked) {
    this.contactService.contacts$ = this.contactService.contacts$.pipe(
      map(contact => contact.filter(favContact => favContact.isFavorite === true))
    );
  } else {
    this.contactService.list();
  }
}

getPaginator(event) {
  if (event.pageIndex === this.pageIndex + 1) {
    this.startIndex = this.startIndex + this.pageSize;
    this.endIndex =  this.endIndex + this.pageSize;
    } else if (event.pageIndex === this.pageIndex - 1) {
    this.startIndex = this.startIndex - this.pageSize;
    this.endIndex =  this.endIndex - this.pageSize;
    }
  this.pageIndex = event.pageIndex;
  }
}
