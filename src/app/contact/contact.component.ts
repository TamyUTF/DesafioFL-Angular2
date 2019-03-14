import { tap, map } from 'rxjs/operators';
import { ContactService } from '../services/contact.service';
import { Component, OnInit } from '@angular/core';
import { Contact } from './contact';
import { Observable } from '../../../node_modules/rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { PagerService } from './../services/pager.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute,
              private pagerService: PagerService) { }

  contacts$: Observable<Contact[]>;
  contacts: Contact[];
  pager: any = {};
  pagedItems: any[];


  showInfo(contact ) {
    this.router.navigate(['/contact', contact]);
  }

  ngOnInit() {
    this.contacts$ = this.contactService.list();
    this.contactService.list()
      .subscribe(data => {
        this.contacts = data;
        this.setPage(1);
      });
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.pagerService.getPager(this.contacts.length, page);
    this.pagedItems = this.contacts.slice(this.pager.startIndex, this.pager.endIdex + 1);
  }
}
