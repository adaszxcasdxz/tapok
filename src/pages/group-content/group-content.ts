import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, AlertController, NavParams, ModalController, ActionSheetController } from 'ionic-angular';
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
  groupkey: any;
  postkey: any[] = [];
  commentTest: any[] = [];
  postTest: any[] = [];
  latestComment: any[] = [];
  userComment: any[] = [];
  latestCommenter: any[] = [];
  ugroupkey: any;
  index = 0;

  constructor(
    public navCtrl: NavController, public viewCtrl: ViewController, public alertCtrl: AlertController,
    public navParams: NavParams, public modalCtrl: ModalController, public firebaseService: FireBaseService,
    public actionCtrl: ActionSheetController
  ){
      var y = 0, z = 0;

      this.user = this.firebaseService.getUser();
      this.key = navParams.get('param1');
      this.post = this.firebaseService.getPost(this.key);
      this.ugroupkey = this.firebaseService.getUserGroup();
      this.group = this.firebaseService.getSpecificGroup(this.key);
      this.group.forEach(groups=> {
        this.group = groups;
      });
      //this.groupkey = navParams.get('param1');
      //this.postkey = navParams.get('param2')
      
      console.log(this.ugroupkey.key);
      this.post.subscribe(snapshots => {
        this.postTest.length = 0;
        y = 0;
        snapshots.forEach(snapshot => {
          this.postTest[y] = snapshot.$key;
          this.test(this.postTest[y], y);
          y++;
        })
      });

      
      
      //console.log(this.postTest[0]);
    
  }

  test(postkey, y){
    console.log(postkey);
    var z = 0;

    this.comment = this.firebaseService.getComment(this.key, postkey);

      this.comment.subscribe(snapshots => {
        this.commentTest.length = 0;
        z = 0;
        snapshots.forEach(snapshot => {
          this.commentTest[z] = snapshot.comment;
          this.userComment[z] = snapshot.commenter;
          this.latestComment[y] = this.commentTest[z];
          this.latestCommenter[y] = this.userComment[z];
          z++;
        })
      });
      console.log(this.latestComment);
  }

  presentActionSheetPost(posts){
    let actionSheet = this.actionCtrl.create({
        buttons: [
          {
            text: 'Edit',
            handler: () => {
              this.editPost(posts);
              console.log('Edit');
              //this.firebaseService.editPost(post);
            }
          }, {
            text: 'Delete',
            handler: () => {
              this.deletePost(posts);
              console.log('Delete');
            }
          }
        ]
    });
    actionSheet.present();
  }

  editGroup(){
    let modal = this.modalCtrl.create('GroupAddPage', { tapok: this.group, label: "Edit Group" });
    modal.present();
  }

  editPost(post){
    console.log(post.$key);
    let modal = this.modalCtrl.create('GroupPost', {tapokGroup: this.group, tapokPost: post, label: "Edit Post"});
    modal.present();
  }

  openGroupPost(group){
        this.navCtrl.push('GroupPost', { param1: group.$key, label: 'Add Post' });
  }

  openComment(group, post){
        this.navCtrl.push('CommentPage', {param1: group.$key, param2: post.$key});
  }

  openAddComment(group, post){
        this.navCtrl.push('CommentAddPage', {param1: group.$key, param2: post.$key, label: 'Add Comment'});
  }

   viewPic(photo){
    let modal = this.modalCtrl.create('ViewPicturePage', { pic: photo });
    modal.present();
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

  leaveGroup(group){
        let confirm = this.alertCtrl.create({
        title: 'You have successfully left the group.',
        buttons: [ 'OK' ]
        })
        let alert = this.alertCtrl.create({
        title: 'Leave Group?',
        buttons: [
            {
            text: 'YES',
            handler: () => {
                this.firebaseService.leaveUserGroup(this.ugroupkey.$key);
                console.log(group);
                //this.check();
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

  check(){
    var gkey = this.group.$key;
    
    for(var gjoined in this.ugroupkey.key){
      if(this.ugroupkey.key[gjoined] == gkey){
        this.firebaseService.leaveUserGroup(this.ugroupkey.$key);
        console.log(this.ugroupkey.$key);
        break;
      }
    }
  }

  /*joinGroup(key){
        this.usergroup={
            "key": key
        }  
        
        let confirm = this.alertCtrl.create({
			title: 'Group Joined!',
			buttons: [ 'OK' ]
        });
        let alert = this.alertCtrl.create({
        title: 'Join Group?',
        buttons: [ 
            {
            text: 'YES',
            handler: () => {
                this.firebaseService.addUserGroup(this.usergroup);  
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
    }*/
}