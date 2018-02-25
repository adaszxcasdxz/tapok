import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';
import { Geolocation } from '@ionic-native/geolocation';
import {Observable} from 'rxjs/Rx';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = 'TapokPage';
  tab2Root = 'EventPage';
  tab3Root = 'GroupPage';
  tab4Root = 'NotificationPage';
  tab5Root = 'UserPage';

  selectedTab: any;
  key: any;

  username: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FireBaseService,  public geolocation: Geolocation) {
    this.username = navParams.get('username');
    this.key = navParams.get('key');
    this.firebaseService.getUser();

    Observable.interval(10000)
    .subscribe((val) => { 
      this.geolocation.getCurrentPosition().then((position) => {
        var coord = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }

        this.firebaseService.updateUserLocation(coord);
      })
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
