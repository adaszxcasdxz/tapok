import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, AlertController, NavParams, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'group-content',
  templateUrl: 'group-content.html'
})
export class GroupContent {

  //groupcont: string = "posts";

  group: any;

  constructor(
    public navCtrl: NavController, public viewCtrl: ViewController, public alertCtrl: AlertController,
    public navParams: NavParams, public modalCtrl: ModalController
  ){
      this.group = navParams.get('param1');
  }

  /*tapok(){
    this.viewCtrl.dismiss();
    let alert = this.alertCtrl.create({
    title: 'Group Joined',
    buttons: ['OK']
    });
    alert.present();
  }*/

}