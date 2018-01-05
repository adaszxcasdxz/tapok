import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import 'rxjs/add/operator/map';
//import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable()
export class FireBaseService {

  user;

  constructor(public tapok: AngularFireDatabase, public firebaseApp: FirebaseApp) {
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
    })/*.map((attendees) =>{
      return attendees.map(attendee =>{
        attendee.attendees = this.tapok.list('/events/'+attendee.$key+'/attendees/');
        return attendee;
      });
    });*/
  }

  getSpecificEvent(key){
    return this.tapok.object('/events/'+key);
  }

  addEvent(name){
    this.tapok.list('/events/').push(name);
  }

  getUserEvents(){
    return this.tapok.list('/users/'+this.user);
  }

  addChat(key, message){
    this.tapok.list('/events/'+key+'/chat').push(message);
  }

  editEvent(eventKey, info){
    this.tapok.object('events/'+eventKey).update(info);
  }

  addTapok(event, eventKey, status, value, attendee, attendeeKey){
    this.tapok.object('events/'+eventKey).update({
      attending: status,
      tapok: value
    });
    if(status == "false"){
      this.tapok.list('events/'+eventKey+'/attendees/').push(attendee);
      this.tapok.list('/users/'+this.user).push(event);
    }
    else{
      this.tapok.object('events/'+eventKey+'/attendees/'+attendeeKey).remove();
      this.tapok.object('/users/'+this.user).remove();
    }
  }

  userTapok(event, eventKey, status, value, attendee, attendeeKey, attendKey){
    this.tapok.object('events/'+eventKey).update({
      attending: status,
      tapok: value
    });
    if(status == "false"){
      this.tapok.list('events/'+eventKey+'/attendees/').push(attendee);
      this.tapok.list('/users/'+this.user).push(event);
    }
    else{
      this.tapok.object('events/'+eventKey+'/attendees/'+attendeeKey).remove();
      this.tapok.object('/users/'+this.user+'/'+attendKey).remove();
    }
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

  uploadPhoto(image){
    var dlURL;
    var metadata = {
      contentType: 'image/jpeg'
    }
    const storageRef = this.firebaseApp.storage().ref().child('images/uploaded.png').put(image);
    //storageRef.putString(image, 'base64', metadata);
    //dlURL = storageRef.child('some text').getDownloadURL;
    return storageRef;
  }

  photoToggle(key, toggle){
    this.tapok.object('events/'+key).update(toggle);
  }

  getUsers(){
    return this.tapok.list('/users/'+this.user);
  }
  
  sendMessage(message, key){
    this.tapok.list('events/'+key+'/chat/').push(message);
  }

  getChat(eventKey){
    return this.tapok.list('/events/'+eventKey+'/chat/',{
      query:{
        orderByChild: 'timestamp'
      }
    });
  }
  
}
