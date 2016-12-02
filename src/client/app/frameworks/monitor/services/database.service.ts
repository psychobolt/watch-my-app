// angular
import { Injectable } from '@angular/core';

// libs
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

// app
let CONFIG = require('../../../../assets/firebase-config.json!json');

@Injectable()
export class DatabaseService {

  private database: firebase.database.Database;

  constructor() {

    // Initialize firebase
    let app = (firebase as any).firebase;
    app.initializeApp(CONFIG);
    this.database = app.database();
  }

  sync(path: string): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.database.ref(path).on('value', (snapshot) => {
        observer.next(snapshot.val());
      });
    });
  }

  onChildRemove(path): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.database.ref(path).on('value', (snapshot) => {
        observer.next(snapshot.val());
      });
    });
  }

  addChild(path: string, data:any): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.database.ref(path).push(data, (err) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(data);
        }
      });
    });
  }

  removeChild(path: string): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.database.ref(path).remove((err) => {
        if (err) {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  updateValue(path: string, data: any): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.database.ref(path).set(data, (err) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(data);
        }
        observer.complete();
      });
    });
  }
}
