import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
//import { ChatContent } from '../chat-content/chat-content';
import { FireBaseService } from '../../providers/firebase-service';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'event.html'
})
export class EventPage {

  Event: any;
  user: any;
  attendees: any;

  constructor(public navCtrl: NavController, public firebaseService: FireBaseService) {
    this.Event = this.firebaseService.getEvent();
    this.user = firebaseService.user;
  }

  tapok(event){
    var status = "false";
    var tapok = event.tapok;
    var attendeeKey;

    for(var attendees in event.attendees){
      if(event.attendees[attendees] == this.user){
        status = "true";
        attendeeKey = attendees;
        break;
      }
    }

    if(status == "false")
      tapok++;
    else
      tapok--;

    this.firebaseService.addTapok(event.$key, status, tapok, this.user, attendeeKey);
  }

  openEventContent(event){
    this.navCtrl.push('EventContent', {param1: event.$key});
  }
}
