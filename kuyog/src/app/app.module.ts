import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { KuyogPage } from '../pages/kuyog/kuyog';
import { KuyogContent } from '../pages/kuyog-content/kuyog-content';
import { Filter } from '../pages/filter/filter';
import { AddKuyog } from '../pages/add-kuyog/add-kuyog';
import { ChatPage } from '../pages/chat/chat';
import { GroupPage } from '../pages/group/group';
import { UserPage } from '../pages/user/user';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    KuyogPage,
    KuyogContent,
    Filter,
    AddKuyog,
    ChatPage,
    GroupPage,
    UserPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    KuyogPage,
    KuyogContent,
    Filter,
    AddKuyog,
    ChatPage,
    GroupPage,
    UserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
