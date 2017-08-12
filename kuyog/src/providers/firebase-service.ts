import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';

@Injectable()
export class FireBaseService {

  constructor(public kuyog: AngularFireDatabase) {

  }

  getEvent(){
    return this.kuyog.list('/event/');
  }

  addEvent(name){
    this.kuyog.list('/event/').push(name);
  }

  removeItem(id){
    this.kuyog.list('kuyog').remove(id);  
  }

}
