import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, AlertController } from 'ionic-angular';

/**
 * Generated class for the PopoverChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover-chat',
  templateUrl: 'popover-chat.html',
})
export class PopoverChatPage {
  event: any;
  keyword: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController, public alertCtrl: AlertController) {
    this.event = navParams.get('event');
    this.keyword = navParams.get('keyword');
  }

  ionViewDidLoad() {
  }

  clickOption(option){
    this.viewCtrl.dismiss(option);
  }

}
