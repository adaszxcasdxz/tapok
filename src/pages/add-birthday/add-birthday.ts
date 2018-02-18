import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';
import * as moment from 'moment';

/**
 * Generated class for the AddBirthdayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-birthday',
  templateUrl: 'add-birthday.html',
})
export class AddBirthdayPage {

  bday = moment().format();
  birthday: any;
  age: any;
  usersdb: any;
  users: any; 

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public firebaseService: FireBaseService, public alertCtrl: AlertController) {
      this.usersdb = this.firebaseService.getUserForBday();
      
      this.usersdb.subscribe(snapshot => { //
            var i = 0;
            snapshot.forEach(snap => {
                this.users = snap;
            })
        });
  }

  addBirthday(){
      this.birthday = moment(this.bday).format('YYYYMMDD');
      this.age = moment(this.birthday, 'YYYYMMDD').fromNow();
      this.age = this.age.substring(0, 2);
      this.firebaseService.loginBirthday(this.age, this.users.$key);

      let alert = this.alertCtrl.create({
			title: 'I hope you did not lie.',
			buttons: [ 'OK' ]
      });
      alert.present();

      this.navCtrl.setRoot('TabsPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddBirthdayPage');
  }

}
