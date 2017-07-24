import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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

@Component({
  template: 
  `
    <ion-header>
      <ion-navbar>
        <ion-title>
          Event Content
        </ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content padding>

    </ion-content>
  `
})
export class EventContent {

  constructor(){

  }

}
