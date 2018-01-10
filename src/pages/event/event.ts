import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, AlertController } from 'ionic-angular';
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
  eventTest: any[] = [];
  userTest: any[] = [];
  status: any[] = [];
  index = 0;

  constructor(public navCtrl: NavController, public firebaseService: FireBaseService, public modalCtrl: ModalController, public alertCtrl: AlertController) {
    this.Event = this.firebaseService.getEvent();
    this.Attending = this.firebaseService.getUserEvents();
    this.user = firebaseService.user;
  }

  confirm(event, key){
      let alert = this.alertCtrl.create({
        title: 'Leave Event?',
        buttons: [ 
          {
            text: 'YES',
            handler: () => {
            this.tapok(event, key);
            }
          },
          {
            text: 'NO',
          }
        ]
      });
      alert.present();
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

  viewPic(photo){
    let modal = this.modalCtrl.create('ViewPicturePage', { pic: photo });
    modal.present();
  }

  openEventContent(event){
    this.navCtrl.push('EventContent', {param1: event.$key});
  }
}
