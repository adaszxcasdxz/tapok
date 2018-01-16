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
    var Key;
    Key = this.tapok.list('/events/').push(name).key;
    return Key;
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

  addKeyword(word){
    var Key;
    Key = this.tapok.list('keywords/').push(word).key;
    return Key;
  }

  getKeywords(keywordKey){
    return this.tapok.list('/keywords/',{ 
      preserveSnapshot: true,
      query: {
        orderByChild: "key",
        equalTo: keywordKey
      }
    });
  }

  getTags(tagKey){
    return this.tapok.list('/tags/',{ 
      preserveSnapshot: true,
      query: {
        orderByChild: "key",
        equalTo: tagKey
      }
    });
  }

  deleteKeyword(key){
    this.tapok.object('/keywords/'+key).remove();
  }

  deleteTag(key){
    this.tapok.object('/tags/'+key).remove(); 
  }

  searchTapok(search){
    return this.tapok.list('/keywords/',{
      query: {
        orderByChild: 'keyword',
        startAt: search,
        endAt: search+'\uf8ff'
      },
    });
  }

  searchTag(search){
    return this.tapok.list('/tags/',{
      query: {
        orderByChild: 'tag',
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

  uploadPhoto(image, key){
    var dlURL;
    var metadata = {
      contentType: 'image/jpeg'
    }
    const storageRef = this.firebaseApp.storage().ref().child('images/'+key+'.jpg').put(image);
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

  addImageName(){
    var key;

    key = this.tapok.list('imageName').push(Date.now());
    return key;
  }

  addTempTag(tag){
    this.tapok.list('temp/temp-tags/'+this.user).push(tag);
  }

  getTempTag(){
    return this.tapok.list('temp/temp-tags/'+this.user);
  }

  deleteTempTag(key){
    this.tapok.list('temp/temp-tags/'+this.user+'/'+key).remove();
  }

  deleteAllTempTag(){
    this.tapok.list('temp/temp-tags/'+this.user).remove();
  }

  addTag(tag){
    this.tapok.list('tags/').push(tag);
  }

  getTag(){
    return this.tapok.list('tags/');
  }
}
