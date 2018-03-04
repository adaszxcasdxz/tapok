import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GooglePlus } from '@ionic-native/google-plus';

import { Camera } from '@ionic-native/camera';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Geolocation } from '@ionic-native/geolocation';

import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { FireBaseService } from './../providers/firebase-service';
import { Facebook } from '@ionic-native/facebook';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AuthProvider } from '../providers/auth/auth';
import { Badge } from '@ionic-native/badge';
import { Push } from '@ionic-native/push';

var kuyogFirebase = {
    apiKey: "AIzaSyB2_PG9pR5KVs9qs1JRH-zA15EuivDxPwA",
    authDomain: "tapok-83ffd.firebaseapp.com",
    databaseURL: "https://tapok-83ffd.firebaseio.com",
    projectId: "tapok-83ffd",
    storageBucket: "tapok-83ffd.appspot.com",
    messagingSenderId: "765761820847"
  };
firebase.initializeApp(kuyogFirebase);

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(kuyogFirebase),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthProvider,
    FireBaseService,
    Camera,
    PhotoViewer,
    Facebook,
    AngularFireAuth,
    SocialSharing,
    Badge,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Push,
    GooglePlus
  ]
})
export class AppModule {

}
