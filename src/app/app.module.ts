import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { Filter } from '../pages/filter/filter';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { GooglePlus } from '@ionic-native/google-plus';
//import { LoginGooglePage } from '../pages/login-google/login-google';

import { Camera } from '@ionic-native/camera';
//import { PhotoViewer } from '@ionic-native/photo-viewer';

import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { FireBaseService } from './../providers/firebase-service';
import firebase from 'firebase';
import { AuthProvider } from '../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';
export const kuyogFirebase = {
    apiKey: "AIzaSyB2_PG9pR5KVs9qs1JRH-zA15EuivDxPwA",
    authDomain: "tapok-83ffd.firebaseapp.com",
    databaseURL: "https://tapok-83ffd.firebaseio.com",
    projectId: "tapok-83ffd",
    storageBucket: "tapok-83ffd.appspot.com",
    messagingSenderId: "765761820847"
  };
firebase.initializeApp(kuyogFirebase);
var googlePlusApi = "AIzaSyCooNeyvH1NkSn4Lz0J5N2Wy5ZwQzFS_Ns";

@NgModule({
  declarations: [
    MyApp,
    //LoginGooglePage,
    Filter,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(kuyogFirebase),
    IonicModule.forRoot(MyApp),
    //LoginGooglePage
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    //LoginGooglePage,
    Filter
    //LoginGooglePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthProvider,
    FireBaseService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    //PhotoViewer,
    AngularFireAuth,
    //GooglePlus
  ]
})
export class AppModule {

}
