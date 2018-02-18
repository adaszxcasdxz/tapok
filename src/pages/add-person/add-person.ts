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
  loginInfo: any[] = [];
  ResultPeople: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FireBaseService) {
    var i;

    this.Login = this.firebaseService.getLogin();

    this.Login.subscribe(snapshot => {
      this.loginInfo.length = 0;
      i = 0;
      snapshot.forEach(snap => {
        this.loginInfo[i] = snap.$key;
        this.ResultPeople[i] = this.firebaseService.searchPeople(this.search, snap.$key);
      })
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPersonPage');
  }

}
