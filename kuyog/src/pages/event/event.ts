import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { EventContent } from '../event-content/event-content';
import { Filter } from '../filter/filter';

@Component({
  selector: 'page-event',
  templateUrl: 'event.html'
})
export class EventPage {

  pages: string = "list";
  public toggled = false;

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController) {
    this.toggled = false;
  }

  toggleSearch(){
    this.toggled = this.toggled ? false : true;
  }

  openEventContent(){
    this.navCtrl.push(EventContent, {});
  }

  showFilterPopOver(myEvent){
    let popover = this.popoverCtrl.create(Filter);
    popover.present({
      ev: myEvent
    });
  }

}

