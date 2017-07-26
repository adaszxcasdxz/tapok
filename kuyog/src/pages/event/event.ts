import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventContent } from '../event-content/event-content';

@Component({
  selector: 'page-event',
  templateUrl: 'event.html'
})
export class EventPage {

  pages: string = "list";
  public toggled = false;

  constructor(public navCtrl: NavController) {
    this.toggled = false;
  }

  toggleSearch(){
    this.toggled = this.toggled ? false : true;
  }

  openEventContent(){
    this.navCtrl.push(EventContent, {});
  }

}

