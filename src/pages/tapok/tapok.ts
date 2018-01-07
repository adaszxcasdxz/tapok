import { Component } from '@angular/core';
import { IonicPage, NavController, PopoverController, ModalController } from 'ionic-angular';
import { Filter } from '../filter/filter';
import { FireBaseService } from '../../providers/firebase-service';

@IonicPage()
@Component({
  selector: 'page-tapok',
  templateUrl: 'tapok.html'
})
export class TapokPage {

  Event: any;
  pages: string = "list";
  public toggled = false;
  user: any;
  attendees: any;
  userEventKeys: any;
  Attending: any;
  Events: any;
  photoToggle: any;

  constructor(
      public navCtrl: NavController, public popoverCtrl: PopoverController, 
      public modalCtrl: ModalController, public firebaseService: FireBaseService) {
    this.toggled = false;
    this.Event = this.firebaseService.getEvent();
    this.Attending = this.firebaseService.getUserEvents();
    this.user = firebaseService.user;
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

  tapok(event){
    var status = "false";
    var tapok = event.tapok;
    var attendeeKey;
    var eventKey;
    var userKey;
    var attendee;

    //if(attended == null){
      for(var attendees in event.attendees){
        if(event.attendees[attendees] == this.user){
          status = "true";
          attendeeKey = attendees;
          console.log(event.attendees[attendees]);
          break;
       }
      }
    /*}else{
      status = "true";
      attendeeKey = attended.$key;
    }*/

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

