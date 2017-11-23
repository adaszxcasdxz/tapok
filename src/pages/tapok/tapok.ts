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

  constructor(
      public navCtrl: NavController, public popoverCtrl: PopoverController, 
      public modalCtrl: ModalController, public firebaseService: FireBaseService) {
    this.toggled = false;
    this.Event = this.firebaseService.getEvent();
    console.log(Event);
    this.user = firebaseService.user;
  }

  toggleSearch(){
    this.toggled = this.toggled ? false : true;
  }
  
  openTapokContent(event){
    this.navCtrl.push('TapokContent', {param1: event.$key});
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
}

