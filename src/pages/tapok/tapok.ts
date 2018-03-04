import { Component } from '@angular/core';
import { IonicPage, NavController, PopoverController, ModalController, AlertController, Platform, ToastController } from 'ionic-angular';
import { Filter } from '../filter/filter';
import { FireBaseService } from '../../providers/firebase-service';
import { PhotoViewer } from '@ionic-native/photo-viewer';
//import { SocialSharing } from '@ionic-native/social-sharing';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { FirebaseApp } from 'angularfire2';

import * as moment from 'moment';
import {Observable} from 'rxjs/Rx';
@IonicPage()
@Component({
  selector: 'page-tapok',
  templateUrl: 'tapok.html'
})
export class TapokPage {

  Event: any;
  User: any;
  pages: string = "upcoming";
  public toggled = false;
  user: any;
  attendees: any;
  userEventKeys: any;
  Attending: any;
  photoToggle: any;
  eventTest: any[] = [];
  eventTime: any[] = [];
  userTest: any[] = [];
  status: any[] = []; //
  index = 0; //
  tapokID: string;
  notif: any;
  //status: any[] = [];
  //index = 0;
  Tags: any;
  age: any;

  ongoingCount: any;
  upcomingCount: any;
  ongoingJoinedCount: any;
  upcomingJoinedCount: any;

  timeStatus: any[] = [];
  memberStatus: any[] = [];
  attend: any[] = [];

  checkIncoming = 1;
  checkOngoing = 1;

  inc = 0;

   constructor(
      public navCtrl: NavController, public popoverCtrl: PopoverController, public alertCtrl: AlertController, 
      public modalCtrl: ModalController, public toastCtrl: ToastController, public firebaseService: FireBaseService, public photoViewer: PhotoViewer, public platform: Platform, public firebaseApp: FirebaseApp /*private sharingVar: SocialSharing*/) {
    var i = 0, y = 0;

    this.age = this.firebaseService.getAge();
    this.toggled = false;
    this.Event = this.firebaseService.getEvent(); //
    this.Attending = this.firebaseService.getUserEvents();
    this.Tags = this.firebaseService.getTag();
    this.User = this.firebaseService.getUsers();
    this.user = firebaseService.getUser();

   Observable.interval(5000)
    .subscribe((val) => { 
      this.inc = 0;
      this.timeCheck();
    });

    this.User.map(users => {
      this.userEventKeys = users;
      }).subscribe(data => {
        data;
      });

    this.User.subscribe(snapshot => { //
      this.userTest.length = 0;
      i = 0;
      snapshot.forEach(snap => {
        this.userTest[i] = snap.key;
        i++;
      })
      this.test();
    }); //

    this.Event.subscribe(snapshots => { //
      this.eventTest.length = 0;
      y = 0;
      snapshots.forEach(snapshot => {
        this.eventTest[y] = snapshot.$key;
        y++;
      })
      this.test();
    });
  }

  ionInfinite(){
    console.log('scroll');
  }

  ionViewDidLoad(){
    this.Tags = this.firebaseService.getTag();
    this.upcomingCount = 1;
    this.ongoingCount = 1;
    this.timeCheck();
  }

  timeCheck(){
    this.Event.subscribe(snapshots => {
      this.eventTime.length = 0;
      var y = 0, x = 0;
      snapshots.forEach(snapshot => {
        if(snapshot.max_members != null){
          if(snapshot.max_members<=snapshot.tapok){
            this.memberStatus[y] = 'full';
          }else{
            this.memberStatus[y] = 'not_full';
          }
        }
    
        this.eventTime[y] = snapshot;          
        var checkTime = moment().isSameOrAfter(moment(snapshot.time, 'hh:mm a'));
        var checkDate = moment().isSameOrAfter(moment(snapshot.date, 'MMM DD'));
        var day = moment(snapshot.date, 'MMM DD').date();
        var checkNotifDate = moment(day).isSameOrAfter(moment().date());
        var timeCheck = moment(snapshot.time,'hh:mm a').format('MMM DD, hh:mm a');
        var checkHour = moment(timeCheck, 'MMM DD, hh:mm a').fromNow();
        if(checkNotifDate &&this.inc == 0){
          if(checkHour == 'in an hour'){
            var attend = this.firebaseService.getAttendees(snapshot.$key).subscribe(People => {
              People.forEach(people => {
                if(people.notif != 'notified'&&this.inc==0){
                  var notif = {
                    'name': this.user,
                    'type': 3,
                    'timestamp': 0-Date.now(),
                    'event_name': snapshot.name,
                    'event_key': snapshot.$key 
                  }

                  var update = {
                    'notif': 'notified'
                  }
                  this.firebaseService.addNotif(people.name, notif);
                  this.firebaseService.editAttendees(snapshot.$key, people.$key, update);
                  this.inc++;
                }
              })
            })
          }
        }
        if(snapshot.status != 'archive'){
          //if no end date and end time
          if(checkTime && checkDate && snapshot.enddate == ''){
            this.timeStatus[y] = 'ongoing';
            //this.firebaseService.updateEventStatus(snapshot.$key, 'ongoing');
          }
          else{
            this.timeStatus[y] = 'upcoming';
            //this.firebaseService.updateEventStatus(snapshot.$key, 'upcoming');
          }
          //with end time but no end date
          if(snapshot.endtime != '' && snapshot.enddate == ''){
            var checkEnd = moment().isSameOrAfter(moment(snapshot.endtime, 'hh:mm a'));
            if(checkEnd){
              this.timeStatus[y] = 'archive';
              //this.firebaseService.editEvent(snapshot.$key, archive);
              //this.firebaseService.updateEventStatus(snapshot.$key, 'archive');
              if(snapshot.status == null){
                var archive = {
                  'status': 'archive'
                }
                this.firebaseService.editEvent(snapshot.$key, archive);
              console.log('archive');
              //this.firebaseService.addHistory(snapshot);
              } 
            }
          }
          //with end date but no end time
          if(snapshot.enddate != '' && snapshot.endtime == ''){
            var checkEnd = moment().isSameOrAfter(moment(snapshot.date, 'MMM DD'));
            if(checkEnd){
              this.timeStatus[y] = 'ongoing';
              //this.firebaseService.updateEventStatus(snapshot.$key, 'ongoing');
            }
          }
          //with end date and end time
          if(snapshot.enddate != '' && snapshot.endtime != ''){
            var checkEndDate = moment().isSameOrAfter(moment(snapshot.enddate, 'MMM DD'));
            var checkDate = moment().isSameOrAfter(moment(snapshot.date, 'MMM DD'));
            var checkEndTime = moment().isSameOrAfter(moment(snapshot.endtime, 'hh:mm a'));
            if(checkDate && !checkEndTime){
              this.timeStatus[y] = 'ongoing';
              //this.firebaseService.updateEventStatus(snapshot.$key, 'ongoing');
            }
            else if( !checkEndTime && !checkEndTime){
              this.timeStatus[y] = 'upcoming';
              //this.firebaseService.updateEventStatus(snapshot.$key, 'upcoming');
            }
            else if (checkEndDate && checkEndTime){
              this.timeStatus[y] = 'archived';
              //this.firebaseService.editEvent(snapshot.$key, archive);
              //this.firebaseService.updateEventStatus(snapshot.$key, 'archive');
              if(snapshot.status == null){
                var archive = {
                  'status': 'archive'
                }
                this.firebaseService.editEvent(snapshot.$key, archive);
                //this.firebaseService.addHistory(snapshot);
                /*console.log('archive');
                console.log(this.inc);
                this.firebaseService.addArchives(snapshot);
                this.firebaseService.deleteEvent(snapshot);
                this.Event = this.firebaseService.getEvent();*/
              }
            }
          }
        }else{
          this.timeStatus[y] = 'archive';
        }

        for(var x=0;x<this.timeStatus.length;x++){
          if(this.status[x]=='TAPOK'){
            if(this.timeStatus[x]=='upcoming')
              this.upcomingCount++;
            else if(this.timeStatus[x]=='ongoing')
              this.ongoingCount++;
          }
        }
        y++;
      });
    });    
  }

  test(){ //
    this.status.length = 0;
    for(var x=0;x<this.eventTest.length;x++){
      this.status[x] = "TAPOK";
      for(var z=0;z<this.userTest.length;z++){
        if(this.eventTest[x]==this.userTest[z]){
          this.status[x] = "JOINED";
          break;
        } 
      }
    }
  } //


  sharePopover(){
    let popover = this.popoverCtrl.create('SharePopoverPage');
    popover.present();

    popover.onDidDismiss(data => {
      if(data=='facebook')
        //this.facebookShare(event);
      if(data=='group')
        this.shareGroup();
    });
  }

  /*shareFacebook(event){
    console.log('facebook');
  }*/

  shareGroup(){
    console.log('group');
  }

  toggleSearch(){
    this.toggled = this.toggled ? false : true;
  }

  toggle(key, toggle){
    if(toggle == "false")
      this.photoToggle = {
        "toggle": "true"
      };
    else if(toggle == "true")
      this.photoToggle = {
        "toggle": "false"
      };

    this.firebaseService.photoToggle(key, this.photoToggle);
  }

  openMap(){
    let modal = this.modalCtrl.create('MapPage');
    modal.present();
  }

  viewPic(photo){
    /*let modal = this.modalCtrl.create('ViewPicturePage', { pic: photo });
    modal.present();*/
    //this.photoVithis.platform.ready().then(() => {ewer.show(photo);
     this.photoViewer.show(photo);
    //this.photoViewer.show(photo);
    //this.photoViewer.show('https://mysite.com/path/to/image.jpg');
    //this.photoViewer.show('https://mysite.com/path/to/image.jpg', 'My image title', {share: false});
  }

  openTapokContent(event){
    let contentModal = this.modalCtrl.create('TapokContent', {param1: event.$key, type: 'JOIN'});
    contentModal.present(); 
  }

  showFilterPopOver(myTapok){
    let popover = this.popoverCtrl.create(Filter);
    popover.present({
      ev: myTapok
    });
  }

  openSearch(){
    let modal = this.modalCtrl.create('SearchPage');
    modal.present();
  }

  showAttendees(key){
    this.navCtrl.push('AttendeesPage', { key: key  });
  }

  confirm(event){
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
  }

  tapok(event){
    var status = "false";
    var tapok = event.tapok;
    var attendeeKey;
    var eventKey;
    var userKey;
    var attendee;

    for(var attendees in event.attendees){
      if(event.attendees[attendees].name == this.user){
        status = "true";
        attendeeKey = attendees;
        console.log(event.attendees[attendees]);
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

    attendee = {
      "name": this.user,
    }

    var notif = {
      "name": this.user,
      "type": 1,
      "timestamp": 0-Date.now(),
      "event_name": event.name,
      "event_key": event.$key
    }

    var memKey='', adminKey='';
    var member = this.firebaseService.getMembers(event.$key);
    member.subscribe(snapshot => {
      snapshot.forEach(snap => {
        if(snap.name == this.user){
          memKey = snap.$key;
        }
      })
    });

    var admin = this.firebaseService.getAdmins(event.$key);
    admin.subscribe(snapshot => {
      snapshot.forEach(snap => {
        if(snap.name == this.user){
          adminKey = snap.$key;
        }
      })
    });

    this.firebaseService.userTapok(eventKey, event.$key, status, tapok, attendee, attendeeKey, userKey);
    this.firebaseService.addNotif(event.host, notif);

    this.alert(event.$key);
  }

  alert(eventKey){
    let alert = this.alertCtrl.create({
      title: 'Event Joined',
      buttons: [ 
        {
          text: 'close',
        },
        {
          text: 'VIEW EVENT',
          handler: () => {					
            this.navCtrl.setRoot('TabsPage');
            let contentModal = this.modalCtrl.create('TapokContent', {param1: eventKey, type: "JOINED"});
              contentModal.present();
          }
        }
      ]
    });
    alert.present();
  }

  /*facebookShare(event){
    this.sharingVar.shareViaFacebookWithPasteMessageHint("Event Name: " +event.name+"\nVenue: "+event.venue+
    "\nDate: "+event.date+"\nTime: "+event.time+"\n\nShared from Tapok",null,(event.photo).toString())
    .then((success)=>{
      
      }).catch((error)=>{
         alert(JSON.stringify(error));
      })
    }*/
}

