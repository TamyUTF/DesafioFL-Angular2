import { tap, map } from 'rxjs/operators';
import { ContactService } from '../services/contact.service';
import { Component, OnInit } from '@angular/core';
import { Contact } from './contact';
import { Observable } from '../../../node_modules/rxjs';
import { Router, ActivatedRoute } from '@angular/router';

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
  contacts: Contact[];
  pageIndex = 0;
  pageSize = 5;
  startIndex = 0;
  endIndex = 5;


  showInfo(contact ) {
    this.router.navigate(['/contact', contact]);
  }

  ngOnInit() {
    this.load();

  }

  load() {
    this.contacts$ = this.contactService.list();
    this.pageIndex = 0;
    this.pageSize = 6;
    this.startIndex = 0;
    this.endIndex = 6;
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



  /*setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.pagerService.getPager(this.contacts.length, page);
    this.pagedItems = this.contacts.slice(this.pager.startIndex, this.pager.endIdex + 1);
  }*/
}
