import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventPage } from '../event/event';


@Component({
  selector: 'page-about',
  templateUrl: 'chat-content.html'
})
export class ChatContent {

  chatTabs:string="Chat";
  constructor(public navCtrl: NavController) {

  }
}
