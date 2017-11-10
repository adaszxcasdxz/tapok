import { Component } from '@angular/core';
import { ViewController, NavController, IonicPage, AlertController, NavParams } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';

/**
 * Generated class for the GroupAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-group-add',
  templateUrl: 'group-add.html',
})

export class GroupAddPage {

  group: any;
  gname = '';
  gdescr = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
     public firebaseService:FireBaseService, public viewCtrl: ViewController) {
  }

  dismiss() {
		this.viewCtrl.dismiss();
  }
  
  addGroup(){
    this.group={
      "gname": this.gname,
      "gdescr": this.gdescr
    }
    this.firebaseService.addGroup(this.group);
    this.viewCtrl.dismiss();
    let alert = this.alertCtrl.create({
      title: 'Group Added',
      buttons: ['OK']
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('Test');
  }

}
