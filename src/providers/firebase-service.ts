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
    //this.uID = afAuth.auth.currentUser.email;
    //this.user="Shakira";
    //this.user="Rihanna";
    //this.user="Britney";
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

  getAge(){
    return 14;
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
    this.tapok.list('/login/'+this.uID).push(user).key;
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

  getEvent(){
    return this.tapok.list('/events/',{
      query:{
        orderByChild: 'datetime'
      }
    })/*.map((members) =>{
      return members.map(attendee =>{
        attendee.members = this.tapok.list('/events/'+attendee.$key+'/members/');
        return attendee;
      });
    });*/
  }

  updateEventStatus(key, val){
    var obj = {
      timeStatus: val
    }
    this.tapok.object('/events/'+key).update(obj);
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

  initializeEvent(){
    var initialize = {
      status: 'initialized'
    }
    this.tapok.list('events/').push(initialize);
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

  getGroupTags(grpTagKey){
    return this.tapok.list('/tags/',{ 
      preserveSnapshot: true,
      query: {
        orderByChild: "key",
        equalTo: grpTagKey
      }
    });
  }

  deleteTag(key){
    this.tapok.object('/tags/'+key).remove(); 
  }

  deleteGroupTag(key){
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

  searchGroupTag(search){
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
        orderByChild: 'search_key',
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

  addUserGroup(user, key){
    this.tapok.list('/users/' + user + '/groupKey/').push(key);
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

  addRequestee(gKey, requestee){
    this.tapok.list('/requestee/' + gKey + '/rmember/').push(requestee);
  }

  getRequestee(gKey){
    return this.tapok.list('/requestee/' + gKey + '/rmember/');
  }
  
  deleteRequestee(gKey, requestee){
    this.tapok.list('/requestee/' + gKey + '/rmember/' + requestee).remove();
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

  addTempGTag(tag){
    this.tapok.list('temp/temp-tags/'+this.user).push(tag);
  }

  getTempTag(){
    return this.tapok.list('temp/temp-tags/'+this.user);
  }

  getTempGTag(){
    return this.tapok.list('temp/temp-tags/'+this.user);
  }

  deleteTempTag(key){
    this.tapok.list('temp/temp-tags/'+this.user+'/'+key).remove();
  }

  deleteTempGTag(key){
    this.tapok.list('temp/temp-tags/'+this.user+'/'+key).remove();
  }

  deleteAllTempTag(){
    this.tapok.list('temp/temp-tags/'+this.user).remove();
  }

  deleteAllTempGTag(){
    this.tapok.list('temp/temp-tags/'+this.user).remove();
  }

  addTag(tag){
    this.tapok.list('tags/').push(tag);
  }

  addGroupTag(tag){
    this.tapok.list('tags/').push(tag);
  }

  getTag(){
    return this.tapok.list('tags/');
  }

  getGroupTag(){
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

  addFollowing(follow, follower){
    this.tapok.list('users/'+this.user+'/following/').push(follow);
    this.tapok.list('users/'+follow.name+'/followers/').push(follower);
  }

  getFollowing(){
    return this.tapok.list('users/'+this.user+'/following/');
  }

  removeFollowing(key){
    this.tapok.list('users/'+this.user+'/following/'+key).remove();
  }

  getAllFollowers(){
    return this.tapok.list('users/'+this.user+'/followers');
  }

  getFollowers(name){
    return this.tapok.list('users/'+name+'/followers');
  }

  removeFollower(name, key){
    return this.tapok.list('users/'+name+'/followers/'+key).remove();
  }

  addNotif(name, notif){
    this.tapok.list('notifications/'+name).push(notif);
  }

  getNotif(){
    return this.tapok.list('notifications/'+this.user, {
      query:{
        orderByChild: 'timestamp'
      }
    });
  }

  editNotif(key, val){
    this.tapok.object('notifications/'+this.user+'/'+key).update(val);
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
    //console.log(event.attendees);
    for(var attendees in event.attendees){
      //console.log(event.attendees[attendees].name);
      this.tapok.list('users/'+event.attendees[attendees].name+'/history').push(event);
    }
  }

  deleteEvent(event){
    //console.log(event);
    this.tapok.list('events/'+event.$key).remove();
  }

  getHistory(){
    return this.tapok.list('users/'+this.user+'/history',{ query:{
        orderByChild: 'name'
      }});
  }

  clearHistory(){
    this.tapok.list('users/'+this.user+'/history').remove();
  }

  updateUserLocation(coor){
    this.tapok.object('users/'+this.user+'/location').update(coor);
  }

  getUserLocation(user){
    return this.tapok.list('users/'+user+'/location');
  }

  allowPermission(){
    return this.tapok.list('users/'+this.user+'/permission').push(true);
  }

  removePermission(){
    return this.tapok.list('users/'+this.user+'/permission').remove();
  }

  getPermission(user){
    return this.tapok.list('users/'+user+'/permission');
  }

  clearNotifs(){
    return this.tapok.list('notifications/'+this.user).remove();
  }
}
