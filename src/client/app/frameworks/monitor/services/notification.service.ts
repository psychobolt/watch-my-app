// angular
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// libs
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NotificationService {

  constructor(
    private http: Http
  ) {

  }

  sendEmail() {
    console.log('sending email');
  }
}