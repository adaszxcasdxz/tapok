import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, AlertController, NavParams, ModalController } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';

@IonicPage()
@Component({
  selector: 'group-content',
  templateUrl: 'group-content.html'
})
export class GroupContent {

  groupcont: string = "posts";
  group: any;
  post: any;
  key: any;
  user: any;
  comment: any;

  constructor(
    public navCtrl: NavController, public viewCtrl: ViewController, public alertCtrl: AlertController,
    public navParams: NavParams, public modalCtrl: ModalController, public firebaseService: FireBaseService
  ){
      this.user = this.firebaseService.getUser();
      this.key = navParams.get('param1');
      this.post = this.firebaseService.getPost(this.key);
      this.group = this.firebaseService.getSpecificGroup(this.key);
      this.group.forEach(groups=> {
        this.group = groups;
      });
      
    console.log(this.group.$key);
    console.log(this.post);
  }

  editGroup(){
    let modal = this.modalCtrl.create('GroupAddPage', { tapok: this.group, label: "Edit Group" });
    modal.present();
  }

  openGroupPost(group){
        this.navCtrl.push('GroupPost', {param1: group.$key});
  }

  openComment(group, post){
        this.navCtrl.push('CommentPage', {param1: group.$key, param2: post.$key});
  }

  openAddComment(group, post){
        this.navCtrl.push('CommentAddPage', {param1: group.$key, param2: post.$key});
  }

  deleteGroup(){
    let confirm = this.alertCtrl.create({
      title: 'Group Disbanded',
      buttons: [ 'OK' ]
    });
    let alert = this.alertCtrl.create({
      title: 'Disband Group?',
      buttons: [ 
        {
          text: 'YES',
          handler: () => {
            this.firebaseService.deleteGroup(this.group.$key);
            this.navCtrl.setRoot('GroupPage');
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

  deletePost(posts){
    let confirm = this.alertCtrl.create({
      title: 'Post Deleted',
      buttons: [ 'OK' ]
    });
    let alert = this.alertCtrl.create({
      title: 'Delete Post?',
      buttons: [ 
        {
          text: 'YES',
          handler: () => {
            this.firebaseService.deletePost(this.group.$key, posts.$key);
            //this.navCtrl.setRoot('GroupContent');
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