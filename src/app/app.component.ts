import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import kuyogFirebase from './app.module';
import googlePlusApi from './app.module';
import firebase from 'firebase';
import { Unsubscribe } from '@firebase/util';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //rootPage:any = 'LoginPage';
  //rootPage:any = 'TabsPage';
  rootPage: any; //

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    //firebase.initializeApp(kuyogFirebase); //

    const unsubscribe: Unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if(!user){
        this.rootPage = 'LoginGooglePage';
        unsubscribe();
      }
      else{
        this.rootPage = 'TabsPage';
        unsubscribe();
      }
    }); //
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //AngularFireModule.initializeApp(kuyogFirebase);
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
