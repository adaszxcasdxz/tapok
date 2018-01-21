import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, AlertController } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';

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

<<<<<<< HEAD
  search = '';
=======
  search: any;
>>>>>>> f881edc1d191e075755446c4ee18b78d16f4f7fd
  Result: any;
  user: any;
  User: any;
  userEventKeys: any;
  Event: any;
  result: any[] = [];
  index = 0;
  userTest: any[] = [];
  eventTest: any[] = [] ;
  status: any[] = [] ;
  tabs: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public firebaseService: FireBaseService, public modalCtrl: ModalController, public alertCtrl: AlertController
  ) {
    var i, y;

    this.tabs = "events";
    this.index = 0;
    this.user = firebaseService.user;
    this.Event = this.firebaseService.getEvent();
    this.User = this.firebaseService.getUsers();
    
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
      this.test();
    });

    this.Event.subscribe(snapshots => {
      this.eventTest.length = 0;
      y = 0;
      snapshots.forEach(snapshot => {
        this.eventTest[y] = snapshot.$key;
        y++;
      })
      this.test();
    });
  }

  test(){
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
    this.onInput();
  }

  onInput(){
    if(this.search != ''){
      var i;

      if(this.tabs == "events")
        this.Result = this.firebaseService.searchTapok(this.search.toLowerCase());
      else if(this.tabs == "tags")
        this.Result = this.firebaseService.searchTag(this.search.toLowerCase());
      this.Result.subscribe(snapshot => {
        this.result.length = 0;
        i = 0;
        snapshot.forEach(snap => {
          this.result[i] = snap.key;
          i++;
        })
        this.test();
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
}
