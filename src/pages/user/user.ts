import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';
import { LoginPage } from '../login/login';
import { App } from 'ionic-angular/components/app/app';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {

  pages: string = "me";
  username: any;
  email:any;
  number:any;
  photo:any;

  constructor(public navCtrl: NavController, public firebaseService: FireBaseService, public app: App, private afAuth: AngularFireAuth) {
    this.username = this.firebaseService.getUser();
    this.email = this.firebaseService.getEmail();
    //this.number = this.firebaseService.getPhoneNum();
    this.photo = this.firebaseService.getPhotoURL();
  }

  logout(){
    //this.app.getRootNav().setRoot('LoginPage');
    this.afAuth.auth.signOut();
    this.app.getRootNav().setRoot('LoginPage');
  }
}
