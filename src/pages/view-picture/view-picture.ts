import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ViewPicturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-picture',
  templateUrl: 'view-picture.html',
})
export class ViewPicturePage {

  pic: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.pic = navParams.get('pic');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewPicturePage');
  }

  dismiss() {
		this.viewCtrl.dismiss();
	}

}
