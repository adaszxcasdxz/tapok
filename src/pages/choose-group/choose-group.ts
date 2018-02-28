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
  gMember: any;
  user: any;
  groupmem: any[] = [];
  event: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FireBaseService, public alertCtrl: AlertController) {
    this.uGroup = this.firebaseService.getUserGroup();
    this.Group = this.firebaseService.getGroup();
    this.user = this.firebaseService.getUser();
    this.event = navParams.get('param1');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseGroupPage');
  }

  shareGroup(gKey, gname){
    var j;
    this.gMember = this.firebaseService.getgroupAttend(gKey);

    this.gMember.subscribe(snapshot => { //
      //this.groupmem.length = 0;
      j = 0;
      snapshot.forEach(snap => {
          this.groupmem[j] = snap.name;
          j++;
      })
      //this.test();
    });
  
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
            for(var i=0; i<this.groupmem.length; i++){
              console.log(this.groupmem.length);
              if(this.user != this.groupmem[i]){
                var notif = {
                  "name": this.groupmem[i],
                  "sharename": this.user,
                  "type": 4,
                  "timestamp": 0-Date.now(),
                  "event_name": this.event.name,
                  "event_key": this.event.$key,
                  "group_name": gname,
                  "group_key": gKey
                }
                console.log(this.groupmem[i]);
                this.firebaseService.addNotif(this.groupmem[i], notif);
              }
            }
            this.firebaseService.shareEvent(gKey, this.event);
            this.navCtrl.setRoot('TabsPage');
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
