import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PopoverGroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover-group',
  templateUrl: 'popover-group.html',
})
export class PopoverGroupPage {
  event: any;
  keyword: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
      this.event = navParams.get('event');
      this.keyword = navParams.get('keyword')
  }

  ionViewDidLoad() {
  }

  clickOption(option){
    this.viewCtrl.dismiss(option);
  }

}
