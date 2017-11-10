import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';

@Injectable()
export class FireBaseService {

  user;

  constructor(public tapok: AngularFireDatabase) {
    this.user = "Kurt Bryan Torregosa";
  }

  setUser(name){
    this.user = name;
  }

  getUser(){
    return this.user;
  }

  getEvent(){
    return this.tapok.list('/events/');
  }

  addEvent(name){
    this.tapok.list('/events/').push(name);
  }

  getGroup(){
    return this.tapok.list('/groups/');
  }

  addGroup(name){
    this.tapok.list('/groups/').push(name);
  }

}
