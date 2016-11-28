// angular
import { Injectable } from '@angular/core';

// libs
import * as Rx from 'rxjs/Rx';
import * as firebase from 'firebase';

// app
let CONFIG = require('/assets/firebase-config.json!json');

@Injectable()
export class DatabaseService {
  private database: firebase.database.Database;
  private onSync:Function;
  private userID:string;

  constructor() {

    // Initialize firebase
    let app = (firebase as any).firebase;
    app.initializeApp(CONFIG);
    this.database = app.database();
  }

  sync(path: string): Rx.Observable<any> {
    return Rx.Observable.create((observer: Rx.Observer<any>) => {
      this.database.ref(path).on('value', (snapshot) => {
        observer.next(snapshot.val());
      });
    });
  }

  onChildRemove(path): Rx.Observable<any> {
    return Rx.Observable.create((observer: Rx.Observer<any>) => {
      this.database.ref(path).on('value', (snapshot) => {
        observer.next(snapshot.val());
      });
    });
  }

  addChild(path: string, data:any): Rx.Observable<any> {
    return Rx.Observable.create((observer: Rx.Observer<any>) => {
      let newMessageRef = this.database.ref(path).push(data, (err) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(data);
        }
        observer.complete();
      });
   });
  }

  updateValue(path: string, data: any): Rx.Observable<any> {
    return Rx.Observable.create((observer: Rx.Observer<any>) => {
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