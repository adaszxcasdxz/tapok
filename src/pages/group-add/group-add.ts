import { Component } from '@angular/core';
import { ViewController, NavController, IonicPage, AlertController, NavParams } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';

/**
 * Generated class for the GroupAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-group-add',
  templateUrl: 'group-add.html',
})

export class GroupAddPage {

  key: any;
  group: any;
  
  host = '';
  gname = '';
  gdescr = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
     public firebaseService:FireBaseService, public viewCtrl: ViewController) {
        this.host = firebaseService.user;
        if(this.group != undefined)
				  this.editGroupInfo();
  }

  dismiss() {
		this.viewCtrl.dismiss();
  }
  
  addGroup(){
    this.group={
      "gname": this.gname,
      "gdescr": this.gdescr
    }
    this.firebaseService.addGroup(this.group);
    this.viewCtrl.dismiss();
    let alert = this.alertCtrl.create({
      title: 'Group Added',
      buttons: ['OK']
    });
    alert.present();
  }

  editGroup(){
		this.group={
			"name": this.gname,
			"description": this.gdescr
		};

		this.firebaseService.editEvent(this.key, this.group);
		this.cancel();
		let alert = this.alertCtrl.create({
			title: 'Changes Saved.',
			buttons: [ 'OK' ]
		});
		alert.present();
  }
  
  cancel(){
		this.viewCtrl.dismiss();
  }
  
  editGroupInfo(){
		this.key = this.group.$key;
		this.gname = this.group.gname;
		this.gdescr = this.group.gdescr;
	}

  ionViewDidLoad() {
    console.log('Test');
  }

}
