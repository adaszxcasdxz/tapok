import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, AlertController, NavParams, ModalController } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';

@IonicPage()
@Component({
  selector: 'group-content',
  templateUrl: 'group-content.html'
})
export class GroupContent {

  //groupcont: string = "posts";

  group: any;
  key: any;
  user: any;

  constructor(
    public navCtrl: NavController, public viewCtrl: ViewController, public alertCtrl: AlertController,
    public navParams: NavParams, public modalCtrl: ModalController, public firebaseService: FireBaseService
  ){
      this.user = this.firebaseService.getUser();
      this.key = navParams.get('param1');
      this.group = this.firebaseService.getSpecificEvent(this.key);
      this.group.forEach(groups=> {
        this.group = groups;
    });
  }

  editGroup(){
    let modal = this.modalCtrl.create('GroupAddPage', { tapok: this.group, label: "Edit Group" });
    modal.present();
  }

  /*tapok(){
    this.viewCtrl.dismiss();
    let alert = this.alertCtrl.create({
    title: 'Group Joined',
    buttons: ['OK']
    });
    alert.present();
  }*/

}