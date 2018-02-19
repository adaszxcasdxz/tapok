import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';

/**
 * Generated class for the ChooseGroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choose-group',
  templateUrl: 'choose-group.html',
})
export class ChooseGroupPage {

  uGroup: any;
  Group: any;
  event: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FireBaseService, public alertCtrl: AlertController) {
    this.uGroup = this.firebaseService.getUserGroup();
    this.Group = this.firebaseService.getGroup();
    this.event = navParams.get('param1');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseGroupPage');
  }

  shareGroup(gKey){
    
    let confirm = this.alertCtrl.create({
      title: 'This event has been successfully shared!',
      buttons: [ 'OK' ]
    });
    let alert = this.alertCtrl.create({
      title: 'Share to this group?',
      buttons: [ 
        {
          text: 'YES',
          handler: () => {
            this.firebaseService.shareEvent(gKey, this.event);
            this.navCtrl.setRoot('TapokPage');
            confirm.present();
          }
        },
        {
          text: 'NO',
        }
      ]
    });
    alert.present(); 
  }
}
