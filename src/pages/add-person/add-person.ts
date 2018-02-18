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
  result: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FireBaseService) {
    

    this.Login = this.firebaseService.getLogin();

    
  }

  onInput(){
    var i;

    this.Login.subscribe(snapshot => {
      this.loginInfo.length = 0;
      i = 0;
      snapshot.forEach(snap => {
        this.loginInfo[i] = snap.$key;
        this.ResultPeople[i] = this.firebaseService.searchPeople(this.search, snap.$key);
        if(this.ResultPeople[i] != undefined){
          this.ResultPeople[i].subscribe(snapshot2 => {
            snapshot2.forEach(snap2 => {
              this.result[i] = snap2;
            })
          });
        }
        i++;
      })
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPersonPage');
  }

}
