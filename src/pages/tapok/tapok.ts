import { Component } from '@angular/core';
import { IonicPage, NavController, PopoverController, ModalController, AlertController } from 'ionic-angular';
import { Filter } from '../filter/filter';
import { FireBaseService } from '../../providers/firebase-service';
//import { PhotoViewer } from '@ionic-native/photo-viewer';

@IonicPage()
@Component({
  selector: 'page-tapok',
  templateUrl: 'tapok.html'
})
export class TapokPage {

  Event: any;
  User: any;
  pages: string = "list";
  public toggled = false;
  user: any;
  attendees: any;
  userEventKeys: any;
  Attending: any;
  photoToggle: any;
  eventTest: any[] = [];
  userTest: any[] = [];
  status: any[] = [];
  index = 0;

  constructor(
      public navCtrl: NavController, public popoverCtrl: PopoverController, public alertCtrl: AlertController, 
      public modalCtrl: ModalController, public firebaseService: FireBaseService) {
    var i = 0, y = 0;

    this.toggled = false;
    this.Event = this.firebaseService.getEvent();
    this.Attending = this.firebaseService.getUserEvents();
    this.User = this.firebaseService.getUsers();
    this.user = firebaseService.user;

    this.User.map(users => {
      this.userEventKeys = users;
      }).subscribe(data => {
        data;
      });

    this.User.subscribe(snapshot => {
      this.userTest.length = 0;
      i = 0;
      snapshot.forEach(snap => {
        this.userTest[i] = snap.key;
        i++;
      })
      this.test();
    });

    this.Event.subscribe(snapshots => {
      this.eventTest.length = 0;
      y = 0;
      snapshots.forEach(snapshot => {
        this.eventTest[y] = snapshot.$key;
        y++;
      })
      this.test();
    });

    console.log(this.userTest);
    console.log(this.eventTest);
  }

  test(){
    this.status.length = 0;

    for(var x=0;x<this.eventTest.length;x++){
      for(var z=0;z<this.userTest.length;z++){
        if(this.eventTest[x]!=this.userTest[z])
          this.status[x] = "TAPOK";
        else{
          this.status[x] = "JOINED";
          break;
        }
        
      }
    }
  }

  toggleSearch(){
    this.toggled = this.toggled ? false : true;
  }

  toggle(key, toggle){
    if(toggle == "false")
      this.photoToggle = {
        "toggle": "true"
      };
    else if(toggle == "true")
      this.photoToggle = {
        "toggle": "false"
      };

    this.firebaseService.photoToggle(key, this.photoToggle);
  }

  viewPic(photo){
    let modal = this.modalCtrl.create('ViewPicturePage', { pic: photo });
    modal.present();
    //this.photoViewer.show(photo);
  }

  openTapokContent(event){
    this.navCtrl.push('TapokContent', {param1: event.$key}); //
  }

  showFilterPopOver(myTapok){
    let popover = this.popoverCtrl.create(Filter);
    popover.present({
      ev: myTapok
    });
  }

  openAddTapok(){
    let modal = this.modalCtrl.create('AddTapok', { label: 'Add Tapok' });
    modal.present();
  }

  openSearch(){
    let modal = this.modalCtrl.create('SearchPage');
    modal.present();
  }

  confirm(event, status){
    if(status == "TAPOK"){
      let alert = this.alertCtrl.create({
        title: 'Join Event?',
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
        if(event.attendees[attendees] == this.user){
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
      "name": this.user
    }

    this.firebaseService.userTapok(eventKey, event.$key, status, tapok, this.user, attendeeKey, userKey);
  }
}

