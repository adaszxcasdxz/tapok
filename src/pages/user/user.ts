import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';
import { LoginPage } from '../login/login';
import { App } from 'ionic-angular/components/app/app';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {

  pages: string = "me";
  username: any;

  constructor(public navCtrl: NavController, public firebaseService: FireBaseService, public app: App) {
    this.username = this.firebaseService.getUser();
  }

  logout(){
    this.app.getRootNav().setRoot('LoginPage');
  }
}
