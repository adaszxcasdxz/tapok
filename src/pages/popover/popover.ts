import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, AlertController } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';

/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  event: any;
  keyword: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController, public alertCtrl: AlertController, public firebaseService: FireBaseService) {
    this.event = navParams.get('event');
    this.keyword = navParams.get('keyword');
  }

  ionViewDidLoad() {
  }

  clickOption(option){
    this.viewCtrl.dismiss(option);
  }

}