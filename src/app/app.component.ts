import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import kuyogFirebase from './app.module';
//import googlePlusApi from './app.module';
import firebase from 'firebase';
import { Unsubscribe } from '@firebase/util';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //rootPage:any = 'LoginPage';
  //rootPage:any = 'TabsPage';
  rootPage:any = 'LoginPage';
  //rootPage:any = 'TabsPage';
  //rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private afAuth: AngularFireAuth) {
    //firebase.initializeApp(kuyogFirebase);

    /*const unsubscribe: Unsubscribe = afAuth.auth.onAuthStateChanged(user => {
      if(!user){
        this.rootPage = 'LoginPage';
        unsubscribe();
      }
      else{
        this.rootPage = 'TabsPage';
        unsubscribe();
      }
    });

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
  }
}
