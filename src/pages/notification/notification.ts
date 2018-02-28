import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ViewController } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  Notifs: any;
  notifs: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public firebaseService: FireBaseService, public modalCtrl: ModalController, public viewCtrl: ViewController, public alertCtrl: AlertController) {
    this.Notifs = this.firebaseService.getNotif();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }

  openSearch(){
    let modal = this.modalCtrl.create('SearchPage');
    modal.present();
  }
  
  openMap(){
    let modal = this.modalCtrl.create('MapPage');
    modal.present();
  }

  clearNotifs(){
    let confirm = this.alertCtrl.create({
      title: 'Notifs Cleared',
      buttons: ['Ok']
    });
    let alert = this.alertCtrl.create({
      title: 'Clear Notifs?',
      buttons: [ 
        {
          text: 'Yes',
          handler: () => {					
            this.firebaseService.clearNotifs();
            confirm.present();
          }
        },
        {
          text: 'No',
        }
      ]
    });
    alert.present();
  }

}
