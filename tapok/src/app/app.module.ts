import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { Filter } from '../pages/filter/filter';
import { EventPage } from '../pages/event/event';
import { GroupPage } from '../pages/group/group';
import { UserPage } from '../pages/user/user';
import { GroupContent } from '../pages/group-content/group-content';
import { ChatContent } from '../pages/chat-content/chat-content';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { FireBaseService } from './../providers/firebase-service';

var kuyogFirebase = {
    apiKey: "AIzaSyCk4mD962DyKQrecncrVpgrQt3ydpj69m8",
    authDomain: "kuyog-a0deb.firebaseapp.com",
    databaseURL: "https://kuyog-a0deb.firebaseio.com",
    projectId: "kuyog-a0deb",
    storageBucket: "kuyog-a0deb.appspot.com",
    messagingSenderId: "1034408130626"
  };

@NgModule({
  declarations: [
    MyApp,
    Filter,
    EventPage,
    GroupPage,
    UserPage,
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
    UserPage,
    GroupContent,
    ChatContent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FireBaseService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
