import { Component } from '@angular/core';
import { ViewController, NavController, IonicPage, AlertController, ModalController, NavParams, ActionSheetController } from 'ionic-angular';
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
  group: any;
  commenter: any;
  commentTest: any[] = [];
  latestComment: any;
  current: any;
  count = 0;
  
  host = '';

  constructor(
    public navCtrl: NavController, public viewCtrl: ViewController, public alertCtrl: AlertController,
    public navParams: NavParams, public modalCtrl: ModalController, public firebaseService: FireBaseService,
    public actionCtrl: ActionSheetController
  ) {
    var y = 0;

    this.host = firebaseService.user;
    this.current = this.firebaseService.getUserID();
    this.commenter = firebaseService.user;
    this.groupkey = navParams.get('param1');
    this.postkey = navParams.get('param2')
    this.post = this.firebaseService.getPost(this.key);
    this.comment = this.firebaseService.getComment(this.groupkey, this.postkey);
    this.post = this.firebaseService.getPost(this.key);
    this.group = this.firebaseService.getSpecificGroup(this.key);

    this.comment.subscribe(snapshots => {
      this.commentTest.length = 0;
      y = 0;
      snapshots.forEach(snapshot => {
        this.commentTest[y] = snapshot;
        this.latestComment = this.commentTest[y];
        this.count++;
        y++;
      })
    });

  }

  presentActionSheetCom(comments){
    let actionSheet = this.actionCtrl.create({
        buttons: [
          {
            text: 'Edit',
            handler: () => {
              this.editComment(comments);
            }
          }, {
            text: 'Delete',
            handler: () => {
              this.deleteComment(comments);
            }
          }
        ]
    });
    actionSheet.present();
  }

  editComment(comments){
    let modal = this.modalCtrl.create('CommentAddPage', {tapokGroup: this.groupkey, tapokPost: this.postkey, tapokCom: comments.$key, label: "Edit Comment"});
    modal.present();
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
            this.count--;
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

  }

}
