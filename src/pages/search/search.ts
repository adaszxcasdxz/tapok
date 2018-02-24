import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, AlertController } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';
import { UserPage } from '../user/user';

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
  requestee: any;

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  openTapokContent(event){
    this.navCtrl.push('TapokContent', {param1: event.$key});
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  changeTab(tab){
    this.tabs = tab;
    console.log(tab);
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
                  this.result[i] = snap2;
                })
                console.log(this.peopleResult[i]);
              });
            }
            i++;
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

  requestJoin(key){
    this.requestee={
        "name": this.user,
        "photo": this.photo,
        "userid": this.userid
    }

     let confirm = this.alertCtrl.create({
      title: 'Your request has been sent!',
      buttons: [ 'OK' ]
        });
        let alert = this.alertCtrl.create({
        title: 'Join this group?',
        buttons: [  
            {
            text: 'YES',
            handler: () => {
        this.firebaseService.addRequestee(key, this.requestee);
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

  /*joinGroup(key, gname){
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
}*/

  openUser(user){
    let modal = this.modalCtrl.create('UserPage', { otherUser: user });
    modal.present();
  }
}
