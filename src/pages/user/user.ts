import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';
import { LoginGooglePage } from '../login-google/login-google';
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
  email: any;
  photo: any;

  constructor(public navCtrl: NavController, public firebaseService: FireBaseService, public app: App, public angularFireAuth: AngularFireAuth) {
    this.username = this.firebaseService.getUser();
    this.email = this.firebaseService.getEmail();
    this.photo = this.firebaseService.getPhotoURL();
  }

  logout(){
    this.angularFireAuth.auth.signOut(); 
    this.app.getRootNav().setRoot('LoginGooglePage');
  }
}
