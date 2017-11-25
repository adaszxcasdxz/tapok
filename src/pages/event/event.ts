import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'event.html'
})
export class EventPage {

  Event: any;
  Attending: any;
  user: any;
  attendees: any;

  constructor(public navCtrl: NavController, public firebaseService: FireBaseService) {
    this.Event = this.firebaseService.getEvent();
    this.Attending = this.firebaseService.getUserEvents();
    this.user = firebaseService.user;
  }

  tapok(event, attendKey){
    var status = "false";
    var tapok = event.tapok;
    var attendeeKey;
    var eventKey;

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

    eventKey = {
      "key": event.$key
    }

    this.firebaseService.userTapok(eventKey, event.$key, status, tapok, this.user, attendeeKey, attendKey);
  }
}
