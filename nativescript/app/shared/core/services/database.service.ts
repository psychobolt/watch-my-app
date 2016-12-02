import { Injectable, Inject, NgZone } from '@angular/core';

@Injectable()
export class NSDatabaseService {
  private database:any;
  private onSync:Function;
  private userID:string;
  constructor(private ngZone: NgZone) {
    console.log('Constructing NSDatabaseService');
    this.database = firebase;
    this.database.init({
      persist: true // Allow disk persistence. Default false.
    }).then((instance:any) => {
      console.log('firebase.init successful');
    }, (error:any) => {
      console.log('firebase.init error: ' + error);
    });
  }

  sync(path: string, onValueReceived: Function):void {
    this.database.addValueEventListener((result:any) => {
      this.ngZone.run(() => {
        onValueReceived(result.value);
      });
    }, path);
  }

  addChild(path:string, data:any, callback?:Function):void {
    this.database.push(path, data).then((result:any) => {
      console.log('created key: ' + result.key);
      if (callback) {
        this.ngZone.run(() => {
          callback(result.key);
        });
      }
    });
  }
}
