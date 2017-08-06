import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'user.html'
})
export class UserPage {

  pages: string = "me";

  constructor(public navCtrl: NavController) {

  }

}
