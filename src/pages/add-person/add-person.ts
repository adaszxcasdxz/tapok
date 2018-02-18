import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';

/**
 * Generated class for the AddPersonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-person',
  templateUrl: 'add-person.html',
})
export class AddPersonPage {

  Login: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FireBaseService) {
    this.Login = this.firebaseService.getLogin();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPersonPage');
  }

}
