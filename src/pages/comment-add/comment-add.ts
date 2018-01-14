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
  gKey: any;
  pKey: any;
  cKey: any;
  label: any;

  host = '';
  timestamp = '';
  datetime = '';

  constructor(
    public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
     public firebaseService:FireBaseService, public viewCtrl: ViewController, public params: NavParams
  ) {
    this.host = firebaseService.user;
    this.commenter = firebaseService.user;
    this.label = navParams.get('label');
    this.groupkey = navParams.get('param1');
    this.postkey = navParams.get('param2');
    this.gKey = navParams.get('tapokGroup');
    this.pKey = navParams.get('tapokPost');
    this.cKey = navParams.get('tapokCom');
    //this.comment = this.firebaseService.getComment(this.groupkey, this.postkey);
  }

  addComment(posts){
    this.post={
      "comment": this.comment,
      "commenter": this.commenter,
      "timestamp": Date.now(),
      "datetime": Date.now()
    }


    if(this.label == "Add Comment")
        this.firebaseService.addComment(this.post, this.groupkey, this.postkey);
    
    let alert = this.alertCtrl.create({
			title: 'Comment Sent!',
			buttons: [ 'OK' ]
    });
    alert.present();
    this.dismiss();
  }

  editComment(posts){
    this.comment={
      "comment": this.comment,
      "datetime": Date.now()
    }
    console.log(this.gKey);
    console.log(this.pKey);
    console.log(this.cKey);
    this.firebaseService.editComments(this.gKey, this.pKey, this.cKey, this.comment);
    let alert = this.alertCtrl.create({
        title: 'Changes Saved!',
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
