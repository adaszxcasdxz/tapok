import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import kuyogFirebase from './app.module';
//import googlePlusApi from './app.module';
import firebase from 'firebase';
import { Unsubscribe } from '@firebase/util';
import { AngularFireAuth } from 'angularfire2/auth';
import { Deeplinks } from '@ionic-native/deeplinks';
//import { TapokContent } from '../pages/tapok-content/tapok-content'

@Component({
  templateUrl: 'app.html'
  
})
export class MyApp {
  //rootPage:any = 'LoginPage';
  //rootPage:any = 'TabsPage';
  rootPage:any = 'LoginPage';
  //rootPage:any = 'TabsPage';
  //rootPage:any;
  @ViewChild(Nav) nav:Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private afAuth: AngularFireAuth,
              public deeplinks: Deeplinks) {
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

      //platform.ready().then(() => {
	      //this.statusBar.styleDefault();

				//This is the code who responds to the app deeplinks
				//Deeplinks if from Ionic Native
	      this.deeplinks.routeWithNavController(this.nav, {
	        //'/about': AboutPage,
	       // '/contact': ContactPage,
	        '/tapok/:tapokID': 'TapokContent'
	      }).subscribe((match) => {
          alert('Successfully routed '+ JSON.stringify(match));
          this.nav.setRoot('TapokContent');
	      }, (nomatch) => {
          alert('Unmatched Route '+ JSON.stringify(nomatch));
	      });
      //});
	  }
}