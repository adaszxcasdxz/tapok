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
  selector: 'page-group-post',
  templateUrl: 'group-post.html',
})

export class GroupPost {

  key: any;
  group: any;
  post: any;
  user: any;
  
  host = '';
  poster = '';
  timestamp = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
     public firebaseService:FireBaseService, public viewCtrl: ViewController, public params: NavParams) {
        this.host = firebaseService.user;
        this.user = firebaseService.user;
        //this.post = this.firebaseService.getPost(this.key);
        this.key = navParams.get('param1');
  }

  addPost(){
      this.group={
      "post": this.post,
      "poster": this.user,
      "timestamp": 0-Date.now()
    }
    this.firebaseService.addPost(this.group, this.key);
    let alert = this.alertCtrl.create({
			title: 'Post Sent!',
			buttons: [ 'OK' ]
    });
    alert.present();
    this.dismiss();
  }

  dismiss() {
		this.viewCtrl.dismiss();
  }
  
  cancel(){
		this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('Test');
  }

}