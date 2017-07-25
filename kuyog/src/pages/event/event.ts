import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventContent } from '../event-content/event-content';

@Component({
  selector: 'page-event',
  templateUrl: 'event.html'
})
export class EventPage {

  pages: string = "list";

  constructor(public navCtrl: NavController) {

  }

  openEventContent(){
    this.navCtrl.push(EventContent, {});
  }

}

