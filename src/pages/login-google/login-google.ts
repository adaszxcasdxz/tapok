import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';
import { FireBaseService } from '../../providers/firebase-service';
import { AngularFireModule } from 'angularfire2';
import { AppModule } from '../../app/app.module';
import googlePlusApi from '../../app/app.module';

/**
 * Generated class for the LoginGooglePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-google',
  templateUrl: 'login-google.html',
})
export class LoginGooglePage {

  userProfile: any = null;
  //googlePlusApi = "AIzaSyDn-6txbosz7KRe6_rFZ8Lwj3Obh63JEik"; 

  constructor(public navCtrl: NavController, public navParams: NavParams, public googlePlus: GooglePlus) {
    AngularFireModule.initializeApp({
    apiKey: "AIzaSyDn-6txbosz7KRe6_rFZ8Lwj3Obh63JEik"
    });
    firebase.auth().onAuthStateChanged( user => {
      if(user){
        this.userProfile = user;
      }
      else{
        this.userProfile = null;
      }
    });
  }

  loginUser(): void {
    this.googlePlus.login({
      'webClientId': '765761820847-odrnbes28kqoqsiml6s1rc77g0ci38v5.apps.googleusercontent.com', 
      'offline': true
    }).then( res => {

      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
      .then( success => {
        console.log("Firebase success"  + JSON.stringify(success));
      })
    
      .catch(error => console.log("Firebase failure: " + JSON.stringify(error)));
    }).catch(err => console.error("Error: ", err));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginGooglePage');
  }

}
