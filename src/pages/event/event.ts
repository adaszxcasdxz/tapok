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
  status: any;
  index = 0;
  Tags: any;
  User: any;
  userEventKeys: any;

  constructor(public navCtrl: NavController, public firebaseService: FireBaseService, public modalCtrl: ModalController, public alertCtrl: AlertController) {
    this.Event = this.firebaseService.getEvent();
    this.Attending = this.firebaseService.getUserEvents();
    this.User = this.firebaseService.getUsers();
    this.user = firebaseService.user;
    this.Tags = this.firebaseService.getTag();
    
    console.log(this.Attending);

    this.Attending.subscribe(snapshot => {
      this.userTest.length = 0;
      var i = 0;
      snapshot.forEach(snap => {
        this.userTest[i] = snap.key;
        i++;
      })
      this.test();
    });

    this.User.map(users => {
      this.userEventKeys = users;
      }).subscribe(data => {
        data;
    });
  }

  test(){
    this.status = "true";
    if(this.userTest[0] == null)
      this.status = "false";
  }

  openTapokContent(event){
    this.navCtrl.push('TapokContent', {param1: event.$key});
  }

  showAttendees(key){
    this.navCtrl.push('AttendeesPage', { key: key  });
  }

  confirm(event, status){
    if(status != "TAPOK"){
      let alert = this.alertCtrl.create({
        title: 'Leave Event?',
        buttons: [ 
          {
            text: 'YES',
            handler: () => {
            this.tapok(event);
            }
          },
          {
            text: 'NO',
          }
        ]
      });
      alert.present();
    }else
      this.tapok(event);
  }

  tapok(event){
    var status = "false";
    var tapok = event.tapok;
    var attendeeKey;
    var eventKey;
    var userKey;
    var attendee;

    for(var attendees in event.attendees){
      if(event.attendees[attendees].name == this.user){
        status = "true";
        attendeeKey = attendees;
        console.log(event.attendees[attendees]);
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

    attendee = {
      "name": this.user,
      "privelage": 'member'
    }

    this.firebaseService.userTapok(eventKey, event.$key, status, tapok, attendee, attendeeKey, userKey);
  }

  viewPic(photo){
    let modal = this.modalCtrl.create('ViewPicturePage', { pic: photo });
    modal.present();
  }

  openEventContent(event){
    this.navCtrl.push('TapokContent', {param1: event.$key});
  }
}
