import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { Filter } from '../pages/filter/filter';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Camera } from '@ionic-native/camera';
import { PhotoViewer } from '@ionic-native/photo-viewer';

import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { FireBaseService } from './../providers/firebase-service';

import { GoogleMaps } from '@ionic-native/google-maps';

var kuyogFirebase = {
    apiKey: "AIzaSyB2_PG9pR5KVs9qs1JRH-zA15EuivDxPwA",
    authDomain: "tapok-83ffd.firebaseapp.com",
    databaseURL: "https://tapok-83ffd.firebaseio.com",
    projectId: "tapok-83ffd",
    storageBucket: "tapok-83ffd.appspot.com",
    messagingSenderId: "765761820847"
  };

@NgModule({
  declarations: [
    MyApp,
    Filter,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(kuyogFirebase),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Filter,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FireBaseService,
    Camera,
    PhotoViewer,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
