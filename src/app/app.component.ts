import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
//import kuyogFirebase from './app.module';
//import googlePlusApi from './app.module';
import firebase from 'firebase';
//import { GooglePlus } from '@ionic-native/google-plus';
import { Unsubscribe } from '@firebase/util';
import { AngularFireAuth } from 'angularfire2/auth';
//import { Deeplinks } from '@ionic-native/deeplinks';
//import { Push, PushObject, PushOptions } from'@ionic-native/push';
//import { TapokContent } from '../pages/tapok-content/tapok-content'

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
  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private afAuth: AngularFireAuth,
              /*public push: Push,*/ public alertCtrl: AlertController) {
    //firebase.initializeApp(kuyogFirebase);

    /*const unsubscribe = afAuth.auth.onAuthStateChanged(user => {
      console.log(user);
      if(!user){
        this.rootPage = 'LoginPage';
        unsubscribe();
      }
      else{
        //this.rootPage = 'TabsPage';
        this.rootPage = 'TapokPage'
        unsubscribe();
      }
    });*/

    /*const unsubscribe = afAuth.auth.onAuthStateChanged( user => {
        console.log(user);
        if (user) {
          this.rootPage = 'TabsPage';
          unsubscribe();
        } else { 
            this.rootPage = 'LoginPage';
            unsubscribe();
        }
      });*/
      platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //AngularFireModule.initializeApp(kuyogFirebase);
      statusBar.styleDefault();
      splashScreen.hide();
      //this.pushSetUp();
      //firebase.initializeApp(kuyogFirebase);
    });
    //}); 
  }

  /*pushSetUp()
  {
    const options: PushOptions = {
      android: {
        senderID: '765761820847'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      }
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification:any) => {
      if (notification.additionalData.foreground) {
        let youralert = this.alertCtrl.create({
          title: 'New notification',
          message: notification.message
        });
        youralert.present();
      }
    });

    pushObject.on('registration').subscribe((registration:any) => {
      alert(registration.registrationId);
    });

    pushObject.on('error').subscribe(error => alert('Error with Push Plugin' + error));
  }*/
}
