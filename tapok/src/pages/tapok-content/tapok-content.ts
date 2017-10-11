import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, AlertController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'tapok-content',
  templateUrl: 'tapok-content.html'
})
export class TapokContent {

  event: any;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public alertCtrl: AlertController,
  public navParams: NavParams){
    this.event = navParams.get('param1');
  }

  tapok(){
    this.viewCtrl.dismiss();
    let alert = this.alertCtrl.create({
    title: 'Tapok Joined',
    buttons: ['OK']
    });
    alert.present();
  }
}