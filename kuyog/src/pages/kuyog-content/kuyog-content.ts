import { Component } from '@angular/core';
import { NavController, ViewController, AlertController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'kuyog-content.html'
})
export class KuyogContent {

  event: any;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public alertCtrl: AlertController,
  public navParams: NavParams){
    this.event = navParams.get('param1');
  }

  kuyog(){
    this.viewCtrl.dismiss();
    let alert = this.alertCtrl.create({
    title: 'Kuyog Joined',
    buttons: ['OK']
    });
    alert.present();
  }
}