import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  page: string = "list";
  isAndroid: boolean = false;

  constructor(public navCtrl: NavController) {
    //this.isAndroid = platform.is('android');
  }

}
