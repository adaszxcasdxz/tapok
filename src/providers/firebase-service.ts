import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';

@Injectable()
export class FireBaseService {

  user;

  constructor(public tapok: AngularFireDatabase) {
    this.user = "Kurt Torregosa";
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

  getSpecificGroup(key){
    return this.tapok.object('/groups/'+key);
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

  editGroups(groupKey, info){
    this.tapok.object('groups/'+groupKey).update(info);
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

  deleteGroup(groupKey){
    this.tapok.object('groups/'+groupKey).remove();
  }

  deletePost(groupKey, postKey){
    this.tapok.object('groups/'+groupKey+'/posts/'+postKey).remove();
  }

  deleteComment(groupKey, postKey, commentKey){
    this.tapok.object('groups/'+groupKey+'/posts/'+postKey+'/comments/'+commentKey).remove();
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

  
}
