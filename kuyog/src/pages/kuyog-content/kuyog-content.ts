import { Component } from '@angular/core';
import { NavController, ViewController, AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'kuyog-content.html'
})
export class KuyogContent {

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public alertCtrl: AlertController){

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