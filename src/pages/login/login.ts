import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, Platform } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { App } from 'ionic-angular/components/app/app';
import { TabsPage } from '../tabs/tabs';
import { FireBaseService } from '../../providers/firebase-service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
 
  userData: any;
  //userProfileRef: any;

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, private toastCtrl: ToastController,
    private facebook: Facebook, private platform: Platform, public app: App, public firebaseService: FireBaseService) { 
  }

  loginWithFacebook(): Promise<any> {
    return this.facebook.login(['email', 'public_profile'])
      .then( response => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);

        firebase.auth().signInWithCredential(facebookCredential)
          .then( success => { 
            //alert("successfully logged in");
            //alert("Firebase success: " + JSON.stringify(success) + JSON.stringify(success.user_birthday)); 
            this.firebaseService.setUser(this.afAuth.auth.currentUser.displayName);
            this.firebaseService.setUID(this.afAuth.auth.currentUser.uid);
            this.navCtrl.setRoot('TabsPage');
            this.userData={
              status:"logged in",
              name:this.afAuth.auth.currentUser.displayName,
              photo:this.afAuth.auth.currentUser.photoURL,
              email:this.afAuth.auth.currentUser.email,
              //bday:this.afAuth.auth.currentUser.user_birthday
            }
            this.firebaseService.loginUser(this.userData);
          });
      }).catch((error) => { console.log(error) });
  }
}