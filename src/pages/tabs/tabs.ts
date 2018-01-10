import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = 'TapokPage';
  tab2Root = 'EventPage';
  tab3Root = 'GroupPage';
  tab4Root = 'UserPage';

  username: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FireBaseService) {
    this.username = navParams.get('username');
    this.firebaseService.setUser(this.username);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
