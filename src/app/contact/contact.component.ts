import { tap } from 'rxjs/operators';
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

  contacts$: Observable<Contact[]>;
  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) {

  }

  openModal(id){
    
  }

  showInfo(contact) {
    this.router.navigate(['/contact', contact]);
  }

  ngOnInit() {
    this.contactService.getContacts();
    this.contacts$ = this.contactService.list();
  }
}
