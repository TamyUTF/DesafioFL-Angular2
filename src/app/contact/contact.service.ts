import { Contact } from './contact';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly API = `${environment.API}api/contacts`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get< Contact[] >(this.API)
    .pipe(
      delay(2000),
      tap(console.log));
  }
}
