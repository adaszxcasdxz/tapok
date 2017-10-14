import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { Filter } from '../pages/filter/filter';
import { EventPage } from '../pages/event/event';
import { GroupPage } from '../pages/group/group';
import { GroupContent } from '../pages/group-content/group-content';
import { ChatContent } from '../pages/chat-content/chat-content';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { FireBaseService } from './../providers/firebase-service';

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
    EventPage,
    GroupPage,
    GroupContent,
    ChatContent
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
    EventPage,
    GroupPage,
    GroupContent,
    ChatContent,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FireBaseService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
