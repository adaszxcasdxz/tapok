import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,  public firebaseService: FireBaseService, public modalCtrl: ModalController) {
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

}
