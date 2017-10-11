import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EventPage } from '../event/event';
import { UserPage } from '../user/user';
import { KuyogPage } from '../kuyog/kuyog';
import { GroupPage } from '../group/group';
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

  tab1Root = KuyogPage;
  tab2Root = EventPage;
  tab3Root = GroupPage;
  tab4Root = UserPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
