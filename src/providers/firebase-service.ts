import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import 'rxjs/add/operator/map';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { AngularFireAuth } from 'angularfire2/auth';
//import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable()
export class FireBaseService {

  user; 
  uID;

  constructor(public tapok: AngularFireDatabase, public firebaseApp: FirebaseApp, public angularFireAuth: AngularFireAuth) {
    //this.user = "Kurt Torregosa";
  }



  setUser(name){
    this.user=name;
  }

  setUID(uid){
    this.uID=uid;
  }

  getUser(){
    return this.user;
  }

  getuID(){
    return this.user.$key;
  }

  getUserID(){
    return this.angularFireAuth.auth.currentUser.uid;
  }

  getPhotoURL(){
    return this.angularFireAuth.auth.currentUser.photoURL;
  }

  getEmail(){
    return this.angularFireAuth.auth.currentUser.email;
  }

  loginUser(user){
    this.tapok.list('/login/'+this.uID).push(user);
    return this.angularFireAuth.auth.currentUser.uid;
  }

  getUsersList(){
    return this.tapok.list('/login/');
  }

  getUserForBday(){
    return this.tapok.list('/login/'+this.uID);
  }

  loginBirthday(age, key){
    console.log(age);
    console.log(key);
    this.tapok.object('/login/'+this.uID+'/'+key+'/age').set(age);
  }

  /*loginUser(user){
    this.tapok.list('login/'+this.uID).push(user);
  }*/

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

  getSpecificGroup(key){
    return this.tapok.object('/groups/'+key);
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

  editGroups(groupKey, info){
    this.tapok.object('groups/'+groupKey).update(info);
  }

  editPosts(groupKey, postKey, info){
    this.tapok.object('/groups/'+groupKey+'/posts/'+postKey).update(info);
  }

  editComments(groupKey, postKey, comKey, info){
    this.tapok.object('/groups/'+groupKey+'/posts/'+postKey+'/comments/'+comKey).update(info);
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

  deleteGroup(groupKey){
    this.tapok.object('groups/'+groupKey).remove();
  }

  deletePost(groupKey, postKey){
    this.tapok.object('groups/'+groupKey+'/posts/'+postKey).remove();
  }

  deleteComment(groupKey, postKey, commentKey){
    this.tapok.object('groups/'+groupKey+'/posts/'+postKey+'/comments/'+commentKey).remove();
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

  deleteKeyword(key){
    this.tapok.object('/keywords/'+key).remove();
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

  getGroup(){
    return this.tapok.list('/groups/',{
      query:{
        orderByChild: 'timestamp'
      }
    });
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

  getUserss(){
    return this.tapok.list('/users/'+this.angularFireAuth.auth.currentUser.uid);
  }
  
  sendMessage(message, key){
    this.tapok.list('events/'+key+'/chat/').push(message);
  }

  getChat(eventKey, content){
    return this.tapok.list('/events/'+eventKey+'/chat/',{
      query:{
        orderByChild: 'timestamp'
      }
    });
  }
  
  addPost(post, key){ //comment, groupkey, postkey
    this.tapok.list('/groups/' + key + '/posts/').push(post);
  }

  addComment(comment, groupkey, postkey){
    this.tapok.list('/groups/' + groupkey + '/posts/' + postkey + '/comments/').push(comment);
  }

  getPost(key){
    return this.tapok.list('/groups/' + key + '/posts/',{
      query:{
        orderByChild: 'timestamp'
      }
    }); //groups key posts key comments
  }

  getComment(groupkey, postkey){
    return this.tapok.list('/groups/' + groupkey + '/posts/' + postkey + '/comments/',{
      query:{
        orderByChild: 'timestamp'
      }
    }); //groups key posts key comments
  }

  addUserGroup(key){
    this.tapok.list('/users/' + this.user + '/groupKey/').push(key);
  }

  getUserGroup(){
    return this.tapok.list('/users/'+this.user+'/groupKey/',{
      query:{
        orderByChild: 'timejoin'
      }
    });
  }  

  leaveUserGroup(gKey){
    this.tapok.list('users/'+this.user+'/groupKey/'+gKey).remove();
  }

  groupAttend(gKey, user){
    this.tapok.list('/groupmember/' + gKey + '/gmember/').push(user);
  }

  removegroupAttend(gKey, user){
    this.tapok.list('/groupmember/' + gKey + '/gmember/' + user).remove();
  }

  getgroupAttend(gKey){
    return this.tapok.list('/groupmember/' + gKey + '/gmember/');
  }

  addImageName(){
    var key;

    key = this.tapok.list('imageName').push(Date.now());
    return key;
  }
}
