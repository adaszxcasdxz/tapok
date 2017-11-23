import { Injectable } from '@angular/core';
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
    return this.tapok.list('/events/',{
      query:{
        orderByChild: 'timestamp'
      }
    });
  }

  getSpecificEvent(key){
    return this.tapok.object('/events/'+key);
  }

  addEvent(name){
    this.tapok.list('/events/').push(name);
  }

  addChat(key, message){
    this.tapok.list('/events/'+key+'/chat').push(message);
  }

  editEvent(eventKey, info){
    this.tapok.object('events/'+eventKey).update(info);
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

  searchTapok(search){
    return this.tapok.list('/events',{
      query: {
        orderByChild: 'search_key',
        startAt: search,
        endAt: search+'\uf8ff'
      },
    });
  }

  getGroup(){
    return this.tapok.list('/groups/');
  }

  addGroup(name){
    this.tapok.list('/groups/').push(name);
  }
  
}
