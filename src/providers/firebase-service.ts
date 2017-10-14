import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';

@Injectable()
export class FireBaseService {

  constructor(public tapok: AngularFireDatabase) {

  }

  getEvent(){
    return this.tapok.list('/events/');
  }

  addEvent(name){
    this.tapok.list('/events/').push(name);
  }

}
