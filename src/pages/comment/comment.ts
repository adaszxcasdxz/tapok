import { Component } from '@angular/core';
import { ViewController, NavController, IonicPage, AlertController, NavParams } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';
/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  key: any;
  comment: any;
  groupkey: any;
  postkey: any;
  post: any;
  commenter: any;
  
  host = '';

  constructor(
    public navCtrl: NavController, public viewCtrl: ViewController, public alertCtrl: AlertController,
    public navParams: NavParams, public firebaseService: FireBaseService
  ) {
    this.host = firebaseService.user;
    this.commenter = firebaseService.user;
    this.groupkey = navParams.get('param1');
    this.postkey = navParams.get('param2')
    //this.post = this.firebaseService.getPost(this.key);
    this.comment = this.firebaseService.getComment(this.groupkey, this.postkey);
    //console.log(this.post.$key);
  }

  deleteComment(comments){
    let confirm = this.alertCtrl.create({
      title: 'Comment Deleted',
      buttons: [ 'OK' ]
    });
    let alert = this.alertCtrl.create({
      title: 'Delete Comment?',
      buttons: [ 
        {
          text: 'YES',
          handler: () => {
            this.firebaseService.deleteComment(this.groupkey, this.postkey, comments.$key);
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
    console.log('ionViewDidLoad CommentPage');
  }

}
