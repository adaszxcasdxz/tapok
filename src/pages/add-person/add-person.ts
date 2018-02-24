import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, } from 'ionic-angular';
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
  search = '';
  index = 0;
  usergroup: any;
  groupmember: any;
  group: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FireBaseService,
  public alertCtrl: AlertController) {
    this.Login = this.firebaseService.getLogin();
    this.group = navParams.get('param1');

    
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
  
  addUser(user){
    this.usergroup={
            "key": this.group.$key,
            "gname": this.group.gname,
            "timejoin": 0-Date.now()
        }  

        let confirm = this.alertCtrl.create({
			title: 'Person succesfully added!',
			buttons: [ 'OK' ]
        });
        let alert = this.alertCtrl.create({
        title: 'Add this user to the group?',
        buttons: [  
            {
            text: 'YES',
            handler: () => {
                this.groupmember={
                    "name": user.name,
                    "photo": user.photo,
                    "userid": user.$key
                }

                var notif = {
                  "name": user.name,
                  "admin": this.group.admin,
                  "type": 6,
                  "timestamp": 0-Date.now(),
                  "group_name": this.group.gname,
                  "group_key": this.group.$key
                }

                this.firebaseService.addNotif(user.name, notif);
                this.firebaseService.addMemberGroup(user.name, this.usergroup);  
                this.firebaseService.groupAttend(this.group.$key, this.groupmember);
                //this.navCtrl.setRoot('GroupPage');
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPersonPage');
  }

}
