import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';

/**
 * Generated class for the SearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  search: any;
  Result: any;
  user: any;
  User: any;
  userEventKeys: any;
  Event: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public firebaseService: FireBaseService
  ) {
    this.user = firebaseService.user;
    this.Event = this.firebaseService.getEvent();
    this.User = this.firebaseService.getUsers();
    
    this.User.map(users => {
    this.userEventKeys = users;
    }).subscribe(data => {
      data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  openTapokContent(event){
    this.navCtrl.push('TapokContent', {param1: event.$key});
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  onInput(){
    if(this.search != "")
      this.Result = this.firebaseService.searchTapok(this.search.toLowerCase());
    else
      this.Result = null;
  }

  tapok(event){
    var status = "false";
    var tapok = event.tapok;
    var attendeeKey;
    var eventKey;
    var userKey;

    for(var attendees in event.attendees){
      if(event.attendees[attendees] == this.user){
        status = "true";
        attendeeKey = attendees;
        break;
      }
    }

    for(var userEventKey in this.userEventKeys){
      if(this.userEventKeys[userEventKey].key == event.$key){
        userKey = this.userEventKeys[userEventKey].$key;
      }
    }

    if(status == "false")
      tapok++;
    else
      tapok--;

    eventKey = {
      "key": event.$key
    }

    this.firebaseService.userTapok(eventKey, event.$key, status, tapok, this.user, attendeeKey, userKey);
  }
}
