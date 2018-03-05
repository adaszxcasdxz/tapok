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
  label: any;
  postKey: any;
  groupKey: any;
  photo: any;
  posterid: any;
  gMember: any;
  groupmem: any[] = [];
  
  host = '';
  poster = '';
  timestamp = '';
  datetime = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
     public firebaseService:FireBaseService, public viewCtrl: ViewController, public params: NavParams) {
        this.host = firebaseService.user;
        this.user = firebaseService.user;
        this.posterid = this.firebaseService.getUserID();
        this.post = this.firebaseService.getPost(this.key);
        this.key = navParams.get('param1');
        this.label = navParams.get('label');
        this.postKey = navParams.get('tapokPost');
        this.groupKey = navParams.get('tapokGroup');
        this.photo = this.firebaseService.getPhotoURL();
        if(this.postKey != undefined)
          this.editPostInfo();
  }

  addPost(post){
    //this.post="";
      this.group={
      "post": this.post,
      "poster": this.user,
      "timestamp": 0-Date.now(),
      "datetime": Date.now(),
      "photo": this.photo,
      "posterid": this.posterid,
    }

    if(this.label == "Add Post")
			this.firebaseService.addPost(this.group, this.key);
    //this.firebaseService.addPost(this.group, this.key);

    let alert = this.alertCtrl.create({
			title: 'Post Sent!',
			buttons: [ 'OK' ]
    });
    alert.present();
    this.dismiss();
  }

  editPost(post){
      this.post={
        "post": this.post,
        "datetime": Date.now()
      }
      this.firebaseService.editPosts(this.groupKey.$key, this.postKey.$key, this.post);
      let alert = this.alertCtrl.create({
        title: 'Changes Saved!',
        buttons: [ 'OK' ]
      });
      alert.present();
      this.dismiss();
  }

  editPostInfo(){
		this.key = this.postKey.$key;
		this.post = this.postKey.post;
	}

  dismiss() {
		this.viewCtrl.dismiss();
  }
  
  cancel(){
		this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
  }

}