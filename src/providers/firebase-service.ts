import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';

@Injectable()
export class FireBaseService {

  user;

  constructor(public tapok: AngularFireDatabase) {
    this.user = "Henry Eguia";
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

  addChat(name){
    this.tapok.list('/chat/').push(name);
  }

  addTapok(eventKey, status, value, attendee, attendeeKey){
    this.tapok.object('events/'+eventKey).update({
      attending: status,
      tapok: value
    });
    if(status == "false")
      this.tapok.list('events/'+eventKey+'/attendees/').push(attendee);
    else
      this.tapok.object('events/'+eventKey+'/attendees/'+attendeeKey).remove();
  }

  deleteTapok(eventKey){
    this.tapok.object('events/'+eventKey).remove();
  }

}
