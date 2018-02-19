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

  selectedTab: any;
  key: any;

  username: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FireBaseService) {
    this.username = navParams.get('username');
    this.key = navParams.get('key');
    this.firebaseService.getUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
    this.selectedTab = this.navParams.get('tabIndex');
    console.log(this.selectedTab);
    /*if(this.selectedTab == 2){
      console.log('test');
      this.navCtrl.setRoot('TapokContent', { param1: this.key });
    }*/
  }

}
