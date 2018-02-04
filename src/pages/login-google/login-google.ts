import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import * as firebase from 'firebase/app';
import { FireBaseService } from '../../providers/firebase-service';
//import { AngularFireModule } from 'angularfire2';
///import { AppModule } from '../../app/app.module';
import googlePlusApi from '../../app/app.module';
import { AuthProvider } from './../../providers/auth/auth';

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
  providers: [GooglePlus]
})

export class LoginGooglePage {
  displayName: any;
  email: any;
  photoURL: any;
  isLoggedIn: boolean = false;
  //userProfile: any = null; 

  constructor(public navCtrl: NavController, public navParams: NavParams, public googlePlus: GooglePlus, public authProvider: AuthProvider) {
    /*AngularFireModule.initializeApp({
    apiKey: "AIzaSyDn-6txbosz7KRe6_rFZ8Lwj3Obh63JEik"
    });
    /*firebase.auth().onAuthStateChanged( user => {
      if(user){
        this.userProfile = user;
      }
      else{
        this.userProfile = null;
      }
    });*/
  }

  /*loginWithGoogle(): Promise<any> {
    //return this.googlePlus.login(['email'])
    return this.googlePlus.login({
        'webClientId': '765761820847-odrnbes28kqoqsiml6s1rc77g0ci38v5.apps.googleusercontent.com',
        'offline': true
      })
    .then( response => {
      console.log("mama mary pls help me");
      const googleCredential = firebase.auth.GoogleAuthProvider.credential(response.authResponse.accessToken);

      firebase.auth().signInAndRetrieveDataWithCredential(googleCredential)
      .then( success => {
        alert("Successfully Logged In!");
        this.navCtrl.setRoot('TabsPage')
      });
    }).catch((error) => { console.log(error) });
  }  */

  loginWithGoogle(): void{
    
    this.authProvider.googleLogin().subscribe((res) => {
      console.log("sulod");
      this.email = res.email;
      this.displayName = res.displayName;
      this.photoURL = res.photoURL;
      this.isLoggedIn = true;
      //this.navCtrl.push('TabsPage');
      //this.navCtrl.setRoot('TabsPage');
    }, err =>{
      console.log(err);
    });
  }

  logout(){
    this.authProvider.logout();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginGooglePage');
  }

}
