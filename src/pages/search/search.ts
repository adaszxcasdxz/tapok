import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, AlertController } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';
import { UserPage } from '../user/user';
import { isEmpty } from 'rxjs/operator/isEmpty';

/**
 * Generated class for the SearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  search = '';
  Result: any;
  ResultPeople: any[] = [];
  user: any;
  User: any;
  userEventKeys: any;
  Event: any;
  Tags: any;
  result: any[] = [];
  peopleResult: any[] = [];
  index = 0;
  userTest: any[] = [];
  eventTest: any[] = [] ;
  status: any[] = [] ;
  tabs: any;
  Login: any;
  loginInfo: any[] = [];
  Group: any;
  uGroup: any;
  groupTest: any[] = [];
  usergroup: any;
  groupmember: any;
  photo: any;
  userid: any;
  FollowingObs: any;
  FollowerObs: any;
  Followers: any[] = [];
  Following: any[] = [];

  memberStatus: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public firebaseService: FireBaseService, public modalCtrl: ModalController, public alertCtrl: AlertController
  ) {
    var i, y;

    this.tabs = "events";
    this.index = 0;
    this.user = firebaseService.user;
    //this.photo = this.firebaseService.getPhotoURL();
    //this.userid = this.firebaseService.getUserID();
    this.Event = this.firebaseService.getEvent();
    this.User = this.firebaseService.getUsers();
    this.Login = this.firebaseService.getLogin();
    this.Tags = this.firebaseService.getTag();
    this.FollowingObs = this.firebaseService.getFollowing();
    this.FollowerObs = this.firebaseService.getAllFollowers();

    this.FollowingObs.subscribe(snapshot => {
      var x=0;
      snapshot.forEach(snap => {
        this.Following[x] = snap;
        x++;
      })
    });

    this.FollowerObs.subscribe(snapshot => {
      var x=0;
      snapshot.forEach(snap => {
        this.Followers[x] = snap;
        x++;
      })
    });

    this.Event.subscribe(snapshots => {
      var y = 0;
      snapshots.forEach(snapshot => {
          if(snapshot.max_members != null){
            if(snapshot.max_members<=snapshot.tapok){
              this.memberStatus[y] = 'full';
            }else{
              this.memberStatus[y] = 'not_full';
            }
          }
        })
      })
    this.User.map(users => {
    this.userEventKeys = users;
    }).subscribe(data => {
      data;
    });

    this.User.subscribe(snapshot => {
      this.userTest.length = 0;
      i = 0;
      snapshot.forEach(snap => {
        this.userTest[i] = snap.key;
        i++;
      })
      this.eTest();
    });

    this.Event.subscribe(snapshots => {
      this.eventTest.length = 0;
      y = 0;
      snapshots.forEach(snapshot => {
        this.eventTest[y] = snapshot.$key;
        y++;
      })
      this.eTest();
    });
  }

  ionViewDidLoad(){
    console.log('test');
  }

  eTest(){
    this.status.length = 0;

    for(var x=0;x<this.eventTest.length;x++){
      for(var z=0;z<this.userTest.length;z++){
        if(this.eventTest[x]!=this.userTest[z])
          this.status[x] = "TAPOK";
        else{
          this.status[x] = "JOINED";
          break;
        }
        
      }
    }
  }

  openTapokContent(event){
    let contentModal = this.modalCtrl.create('TapokContent', {param1: event.$key, type: 'JOIN'});
    contentModal.present();
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  changeTab(tab){
    this.tabs = tab;
    this.onInput();
  }

  onInput(){
    if(this.search != ''){
      var i;

      if(this.tabs == "events")
        this.Result = this.firebaseService.searchTapok(this.search.toLowerCase());
      else if(this.tabs == "tags")
        this.Result = this.firebaseService.searchTag(this.search.toLowerCase());
      else if(this.tabs == "groups"){
        this.Group = this.firebaseService.searchGroup(this.search);
        this.uGroup = this.firebaseService.getUserGroup();  
      }
      else if(this.tabs == "people"){
        this.Login.subscribe(snapshot => {
          this.loginInfo.length = 0;
          i = 0;
          snapshot.forEach(snap => {
            this.loginInfo[i] = snap.$key;
            this.ResultPeople[i] = this.firebaseService.searchPeople(this.search, snap.$key);
            if(this.ResultPeople[i] != undefined){
              this.ResultPeople[i].subscribe(snapshot2 => {
                snapshot2.forEach(snap2 => {
                  if(this.firebaseService.getUser()!=snap2.name_search)
                    this.result[i] = snap2;
                })
              });
            }
            i++;
          })
        });

        this.FollowingObs.subscribe(snapshot => {
          var x=0;
          snapshot.forEach(snap => {
            this.Following[x] = snap;
            x++;
          })
        });

        this.FollowerObs.subscribe(snapshot => {
          var x=0;
          snapshot.forEach(snap => {
            this.Followers[x] = snap;
            x++;
          })
        });
      }
      if(this.tabs == "events" || this.tabs == "tags")
      this.Result.subscribe(snapshot => {
        this.result.length = 0;
        i = 0;
        snapshot.forEach(snap => {
          this.result[i] = snap.key;
          i++;
        })
        this.eTest();
      });
    }
    else{
      this.Result = null;
      this.result = [""];
    }
  }

  viewPic(photo){
    let modal = this.modalCtrl.create('ViewPicturePage', { pic: photo });
    modal.present();
  }

  confirm(event, status){
    if(status == "TAPOK"){
      let alert = this.alertCtrl.create({
        title: 'Join Event?',
        buttons: [ 
          {
            text: 'YES',
            handler: () => {
            this.tapok(event);
            }
          },
          {
            text: 'NO',
          }
        ]
      });
      alert.present();
    }else if(status == "JOINED"){
      let alert = this.alertCtrl.create({
        title: 'Leave Event?',
        buttons: [ 
          {
            text: 'YES',
            handler: () => {
            this.tapok(event);
            }
          },
          {
            text: 'NO',
          }
        ]
      });
      alert.present();
    }else
      this.tapok(event);
  }

  tapok(event){
    var status = "false";
    var tapok = event.tapok;
    var attendeeKey;
    var eventKey;
    var userKey;

    for(var attendees in event.attendees){
      if(event.attendees[attendees] == this.user){
        status = "true";
        attendeeKey = attendees;
        break;
      }
    }

    for(var userEventKey in this.userEventKeys){
      if(this.userEventKeys[userEventKey].key == event.$key){
        userKey = this.userEventKeys[userEventKey].$key;
      }
    }

    if(status == "false")
      tapok++;
    else
      tapok--;

    eventKey = {
      "key": event.$key
    }

    this.firebaseService.userTapok(eventKey, event.$key, status, tapok, this.user, attendeeKey, userKey);
  }

  joinGroup(key, gname){
    this.usergroup={
        "key": key,
        "gname": gname,
        "timejoin": 0-Date.now()
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
            this.groupmember={
                "name": this.user,
                "photo": this.photo,
                "userid": this.userid
            }
            this.firebaseService.addUserGroup(this.usergroup);  
            this.firebaseService.groupAttend(key, this.groupmember);
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

  openUser(user, event){
    let modal = this.modalCtrl.create('UserPage', { otherUser: user });
    modal.present({
      ev: event
    });

    modal.onDidDismiss(data => {
      this.FollowingObs = this.firebaseService.getFollowing();
      this.FollowingObs.subscribe(snapshot => {
        var x=0;
        if(snapshot.length == 0)
          this.Following[x] = 0;
        snapshot.forEach(snap => {
          if(snap != null){
            this.Following[x] = snap;
            x++;
          }
        })
      });

      this.FollowerObs = this.firebaseService.getAllFollowers();
      this.FollowerObs.subscribe(snapshot => {
        var x=0;
        if(snapshot.length == 0)
          this.Followers[x] = 0;
        snapshot.forEach(snap => {
          if(snap != null){
            this.Followers[x] = snap;
            x++;
          }
        })
      });
    });
  }

  followPerson(fol){
    var follow = {
      'name': fol.name,
      'email': fol.email,
      'photo': fol.photo
    }

    var follower = {
      'name': this.firebaseService.getUser(),
      //this.email = this.firebaseService.getEmail();
      'email': 'this.firebaseService.getEmail()',
      //this.photo = this.firebaseService.getPhotoURL();
      'photo': 'this.firebaseService.getPhotoURL()'
    }

    this.firebaseService.addFollowing(follow, follower);
  }
}
