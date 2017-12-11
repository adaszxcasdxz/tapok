import { Component } from '@angular/core';
import { ViewController, NavController, IonicPage, AlertController, NavParams } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';

/**
 * Generated class for the CommentAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment-add',
  templateUrl: 'comment-add.html',
})
export class CommentAddPage {

  key: any;
  group: any;
  post: any;
  comment: any;
  groupkey: any;
  postkey: any;
  commenter: any;

  host = '';
  timestamp = '';

  constructor(
    public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
     public firebaseService:FireBaseService, public viewCtrl: ViewController, public params: NavParams
  ) {
    this.host = firebaseService.user;
    this.commenter = firebaseService.user;
    this.groupkey = navParams.get('param1');
    this.postkey = navParams.get('param2');
    //this.comment = this.firebaseService.getComment(this.groupkey, this.postkey);
  }

  addComment(posts){
    this.post={
      "comment": this.comment,
      "commenter": this.commenter,
      "timestamp": 0-Date.now()
    }
    this.firebaseService.addComment(this.post, this.groupkey, this.postkey);
    
    let alert = this.alertCtrl.create({
			title: 'Comment Sent!',
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
    console.log('ionViewDidLoad CommentAddPage');
  }

}
