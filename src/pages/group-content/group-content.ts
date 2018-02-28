import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, AlertController, NavParams, ModalController, PopoverController, ActionSheetController } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';

@IonicPage()
@Component({
  selector: 'group-content',
  templateUrl: 'group-content.html'
})
export class GroupContent {

  groupcont: string = "posts";
  memberscont: string = "groupmem";
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
  current: any;
  posterid: any;
  gmember: any;
  rmember: any;
  sharedevent: any;
  keyword: any[] = [];
  usergroup: any;
  groupmember: any;
  photo: any;
  userid: any;


  constructor(
    public navCtrl: NavController, public viewCtrl: ViewController, public alertCtrl: AlertController,
    public navParams: NavParams, public modalCtrl: ModalController, public firebaseService: FireBaseService,
    public actionCtrl: ActionSheetController, public popoverCtrl: PopoverController
  ){
      var y = 0, z = 0;

      this.user = this.firebaseService.getUser();
      this.current = this.firebaseService.getUserID();
      console.log(this.current)
      this.key = navParams.get('param1');
      this.gmember = this.firebaseService.getgroupAttend(this.key);
      this.rmember = this.firebaseService.getRequestee(this.key);
      this.post = this.firebaseService.getPost(this.key);
      this.ugroupkey = this.firebaseService.getUserGroup();
      this.group = this.firebaseService.getSpecificGroup(this.key);
      this.sharedevent = this.firebaseService.getSharedEvent(this.key);
      this.photo = this.firebaseService.getPhotoURL();
      this.userid = this.firebaseService.getUserID();
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

  popOver(group){
    let popover = this.popoverCtrl.create('PopoverGroupPage', {group: this.group, keyword: this.keyword});
    popover.present({
      ev: group
    });

    popover.onDidDismiss(data => {
      if(data=='add')
        this.openAddToGroup();
      if(data=='edit')
        this.editGroup();
      if(data=='delete')
        this.deleteGroup();
    });
  }

  editGroup(){
    console.log(this.group);
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

  denyRequest(key, rmember){
    let confirm = this.alertCtrl.create({
      title: 'Request has been denied.',
      buttons: [ 'OK' ]
    });
    let alert = this.alertCtrl.create({
      title: 'Deny this request?',
      buttons: [ 
        {
          text: 'YES',
          handler: () => {
            this.firebaseService.deleteRequestee(key, rmember);
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

  joinGroup(key, gname, rmember, admin){
      this.usergroup={
          "key": key,
          "gname": gname,
          "timejoin": 0-Date.now()
          }  

      let confirm = this.alertCtrl.create({
			title: 'Request Accepted!',
			buttons: [ 'OK' ]
        });
        let alert = this.alertCtrl.create({
        title: 'Accept this request?',
        buttons: [  
            {
            text: 'YES',
            handler: () => {
              
                this.groupmember={
                    "name": rmember.name,
                    "photo": rmember.photo,
                    "userid": rmember.userid
                }

                var notif = {
                  "name": rmember.name,
                  "admin": admin,
                  "type": 6,
                  "timestamp": 0-Date.now(),
                  "group_name": gname,
                  "group_key": key
                }

                this.firebaseService.addNotif(rmember.name, notif);
                this.firebaseService.addUserGroup(rmember.name, this.usergroup);  
                this.firebaseService.groupAttend(key, this.groupmember);
                this.firebaseService.deleteRequestee(key, rmember.$key);
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

  openTapokContent(event){
    this.navCtrl.push('TapokContent', {param1: event}); 
  }

  openAddToGroup(){
    console.log(this.group);
    console.log(this.group.$key);
    this.navCtrl.push('AddPersonPage', {param1: this.group})
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