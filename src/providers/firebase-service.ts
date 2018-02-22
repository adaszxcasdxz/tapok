import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import 'rxjs/add/operator/map';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { AngularFireAuth } from 'angularfire2/auth';
//import * as firebase from 'firebase/app';
import 'firebase/storage';
import { concat } from 'rxjs/operator/concat';

@Injectable()
export class FireBaseService {

  user; 
  uID;

  constructor(public tapok: AngularFireDatabase, public firebaseApp: FirebaseApp, private afAuth: AngularFireAuth) {
    //this.user = afAuth.auth.currentUser.displayName;
    //this.user="John Henry Eguia"
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
    return this.afAuth.auth.currentUser.uid;
  }

  getPhotoURL(){
    return this.afAuth.auth.currentUser.photoURL;
  }

  getEmail(){
    return this.afAuth.auth.currentUser.email;
  }

  loginUser(user){
    this.tapok.list('/login/'+this.uID).push(user);
    return this.afAuth.auth.currentUser.uid;
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

  getLogin(){
    return this.tapok.list('login');
  }

  /*loginUser(user){
    this.tapok.list('login/'+this.uID).push(user);
  }*/

  getEvent(){
    return this.tapok.list('/events/',{
      query:{
        orderByChild: 'timestamp'
      }
    })/*.map((members) =>{
      return members.map(attendee =>{
        attendee.members = this.tapok.list('/events/'+attendee.$key+'/members/');
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
    var obj = {
      "key": Key
    }

    var attendee = {
      "name": this.user,
    }
    this.tapok.list('events/'+Key+'/attendees/').push(attendee);

    this.tapok.list('/users/'+this.user).push(obj);
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

  userTapok(event, eventKey, status, value, attendee, attendeeKey, attendKey){
    this.tapok.object('events/'+eventKey).update({
      attending: status,
      tapok: value
    });
    
    if(status == "false"){
      this.tapok.list('events/'+eventKey+'/attendees/').push(attendee);
      this.tapok.list('events/'+eventKey+'/members/').push(attendee);
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

  getAllKeywords(){
    return this.tapok.list('/keywords/');
  }

  deleteKeywords(key){
    return this.tapok.list('keywords/'+key).remove();
  }

  deleteKeyword(key){
    this.tapok.object('/keywords/'+key).remove();
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

  searchGroup(search){
    return this.tapok.list('/groups/',{
      query: {
        orderByChild: 'gname',
        startAt: search,
        endAt: search+'\uf8ff'
      },
    });
  }

  searchPeople(search, id){
    return this.tapok.list('login/'+id+'/',{
      query: {
        orderByChild: 'name_search',
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
    var Key;
    Key = this.tapok.list('/groups/').push(name).key;
    //this.addUserGroup(Key);
    return Key;
  }

  /*addEvent(name){
    var Key;
    Key = this.tapok.list('/events/').push(name).key;
    return Key;
  }*/

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
    return this.tapok.list('/users/'+this.afAuth.auth.currentUser.uid);
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

  addMemberGroup(name, key){
    this.tapok.list('/users/' + name + '/groupKey/').push(key);
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

  shareEvent(gKey, event){
    this.tapok.list('/sharedgroup/' + gKey + '/sharedEvent/').push(event);
  }

  getSharedEvent(gKey){
    return this.tapok.list('/sharedgroup/' + gKey + '/sharedEvent/');
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

  getAttendees(key){
    return this.tapok.list('events/'+key+'/attendees');
  }

  editAttendees(key, attendKey, info){
    this.tapok.object('events/'+key+'/attendees/'+attendKey).update(info);
  }

  getMembers(key){
    return this.tapok.list('events/'+key+'/members');
  }

  addMember(eventKey, attendee){
    this.tapok.list('events/'+eventKey+'/members/').push(attendee);
  }

  removeMember(eventKey, memberKey){
    this.tapok.list('events/'+eventKey+'/members/'+memberKey).remove();
  }

  getAdmins(key){
    return this.tapok.list('events/'+key+'/admins');
  }

  addAdmin(eventKey, attendee){
    this.tapok.list('events/'+eventKey+'/admins/').push(attendee);
  }

  removeAdmin(eventKey, adminKey){
    this.tapok.object('events/'+eventKey+'/admins/'+adminKey).remove();
  }

  kickAttendee(eventKey, attendeeKey, userKey, value){
    this.tapok.object('events/'+eventKey+'/members/'+attendeeKey).remove();
    this.tapok.object('users/'+this.user+'/'+userKey).remove();
    this.tapok.object('events/'+eventKey).update({
      'tapok': value
    })
  }

  addFollowing(user){
    this.tapok.list('users/'+this.user+'/following/').push(user);
    var follower = {
      "name": this.user
    };
    this.tapok.list('users/'+user.name+'/followers/').push(follower);
  }

  getFollowing(){
    return this.tapok.list('users/'+this.user+'/following/');
  }

  removeFollowing(key){
    this.tapok.list('users/'+this.user+'/following/'+key).remove();
  }

  getFollowers(){
    return this.tapok.list('users/'+this.user+'/followers');
  }

  addNotif(name, notif){
    this.tapok.list('notifications/'+name).push(notif);
  }

  getNotif(){
    return this.tapok.list('notifications/'+this.user);
  }

  addLatestNotif(notif){
    this.tapok.list('latest_notifications/'+this.user).push(notif);
  }

  getLatestNotif(){
    return this.tapok.list('latest_notifications/'+this.user);
  }

  deletelatestNotif(){
    this.tapok.list('latest_notifications/'+this.user).remove();
  }

  addHistory(event){
    this.tapok.list('users/'+this.user+'/history').push(event);
  }

  getHistory(){
  return  this.tapok.list('users/'+this.user+'/history');
  }

  updateUserLocation(coor){
    this.tapok.object('users/'+this.user+'/location').update(coor);
  }

  getUserLocation(){
    return this.tapok.list('users/'+this.user+'/location');
  }
}
