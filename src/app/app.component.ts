import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import kuyogFirebase from './app.module';
//import googlePlusApi from './app.module';
import firebase from 'firebase';
//import { GooglePlus } from '@ionic-native/google-plus';
import { Unsubscribe } from '@firebase/util';
import { AngularFireAuth } from 'angularfire2/auth';

/*var kuyogFirebase = {
    apiKey: "AIzaSyB2_PG9pR5KVs9qs1JRH-zA15EuivDxPwA",
    authDomain: "tapok-83ffd.firebaseapp.com",
    databaseURL: "https://tapok-83ffd.firebaseio.com",
    projectId: "tapok-83ffd",
    storageBucket: "tapok-83ffd.appspot.com",
    messagingSenderId: "765761820847"
  };*/

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //rootPage:any = 'LoginPage';
  rootPage: any = 'LoginPage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private afAuth: AngularFireAuth) {
    //firebase.initializeApp(kuyogFirebase);
    firebase.auth().getRedirectResult().then(function(result){
      if(result.credential){
        var token = result.credential.accessToken;
        var user = result.user;
      }
    }).catch(function(error){
      var errorMessage = error.message;
      console.log(errorMessage);
    })

    const unsubscribe = afAuth.auth.onAuthStateChanged(user => {
      console.log(user);
      if(!user){
        this.rootPage = 'LoginPage';
        unsubscribe();
      }
      else{
        this.rootPage = 'TabsPage';
        unsubscribe();
      }
    });

      platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //AngularFireModule.initializeApp(kuyogFirebase);
      statusBar.styleDefault();
      splashScreen.hide();
      //firebase.initializeApp(kuyogFirebase);
    });
    //}); 
    
    
  }
}
