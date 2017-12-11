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
  label: any;
  user: any;
  
  admin = '';
  gname = '';
  gdescr = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
     public firebaseService:FireBaseService, public viewCtrl: ViewController, public params: NavParams) {
        this.admin = firebaseService.user;
        this.label = params.get('label');
			  this.group = params.get('tapok');
        if(this.group != undefined)
				  this.editGroupInfo();
  }

  dismiss() {
		this.viewCtrl.dismiss();
  }
  
  addGroup(){
    this.group={
      "gname": this.gname,
      "gdescr": this.gdescr,
      "admin": this.admin
    }

    if(this.label == "Add Group")
			this.firebaseService.addGroup(this.group);
		this.cancel();
		let alert = this.alertCtrl.create({
			title: 'Group Created',
			buttons: [ 'OK' ]
		});
    alert.present();
  }

  editGroup(){
		this.group={
			"gname": this.gname,
			"gdescr": this.gdescr
		};

		this.firebaseService.editGroups(this.key, this.group);
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
