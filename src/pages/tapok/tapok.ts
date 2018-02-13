import { Component } from '@angular/core';
import { IonicPage, NavController, PopoverController, ModalController, AlertController, Platform } from 'ionic-angular';
import { Filter } from '../filter/filter';
import { FireBaseService } from '../../providers/firebase-service';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { SocialSharing } from '@ionic-native/social-sharing';
import { NavParams } from 'ionic-angular/navigation/nav-params';

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
  //status: any[] = [];
  //index = 0;
  Tags: any;

  timeStatus: any[] = [];
  memberStatus: any[] = [];

   constructor(
      public navCtrl: NavController, public popoverCtrl: PopoverController, public alertCtrl: AlertController, 
      public modalCtrl: ModalController, public firebaseService: FireBaseService, public photoViewer: PhotoViewer, public platform: Platform, private sharingVar: SocialSharing) {
    var i = 0, y = 0;

    this.toggled = false;
    this.Event = this.firebaseService.getEvent(); //
    this.Attending = this.firebaseService.getUserEvents();
    this.Tags = this.firebaseService.getTag();
    this.User = this.firebaseService.getUsers();
    this.user = firebaseService.getUser();

    Observable.interval(5000)
    .subscribe((val) => {
      //console.log(moment().format('hh:mm:ss').toString()); 
      this.Event.subscribe(snapshots => {
        this.eventTime.length = 0;
        y = 0;
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
          //if no end date and end time
          if(checkTime && checkDate && snapshot.enddate == '')
            this.timeStatus[y] = 'ongoing';
          else
            this.timeStatus[y] = 'upcoming';
          //with end time but no end date
          if(snapshot.endtime != '' && snapshot.enddate == ''){
            var checkEnd = moment().isSameOrAfter(moment(snapshot.endtime, 'hh:mm a'));
            if(checkEnd)
              this.timeStatus[y] = 'archived';
          }
          //with end date but no end time
          if(snapshot.enddate != '' && snapshot.endtime == ''){
            var checkEnd = moment().isSameOrAfter(moment(snapshot.enddate, 'MMM DD'));
            if(checkEnd)
              this.timeStatus[y] = 'ongoing';
          }
          //with end date and end time
          if(snapshot.enddate != '' && snapshot.endtime != ''){
            var checkEndDate = moment().isSameOrAfter(moment(snapshot.enddate, 'MMM DD'));
            var checkEndTime = moment().isSameOrAfter(moment(snapshot.endtime, 'hh:mm a'));
            if(checkEndDate && !checkEndTime)
              this.timeStatus[y] = 'ongoing';
            else if( !checkEndTime && !checkEndTime)
              this.timeStatus[y] = 'upcoming';
            else if (checkEndDate && checkEndTime)
              this.timeStatus[y] = 'archived';
          }
          y++;
        })
      });
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

  ionViewDidLoad(){
    this.Event.subscribe(snapshots => {
      this.eventTime.length = 0;
      var y = 0;
      snapshots.forEach(snapshot => {
        this.eventTime[y] = snapshot;          
        var checkTime = moment().isSameOrAfter(moment(snapshot.time, 'hh:mm a'));
        var checkDate = moment().isSameOrAfter(moment(snapshot.date, 'MMM DD'));
        //if no end date and end time
        if(checkTime && checkDate && snapshot.enddate == '')
          this.timeStatus[y] = 'ongoing';
        else
          this.timeStatus[y] = 'upcoming';
        //with end time but no end date
        if(snapshot.endtime != '' && snapshot.enddate == ''){
          var checkEnd = moment().isSameOrAfter(moment(snapshot.endtime, 'hh:mm a'));
          if(checkEnd)
            this.timeStatus[y] = 'archived';
        }
        //with end date but no end time
        if(snapshot.enddate != '' && snapshot.endtime == ''){
          var checkEnd = moment().isSameOrAfter(moment(snapshot.enddate, 'MMM DD'));
          if(checkEnd)
            this.timeStatus[y] = 'ongoing';
        }
        //with end date and end time
        if(snapshot.enddate != '' && snapshot.endtime != ''){
          var checkEndDate = moment().isSameOrAfter(moment(snapshot.enddate, 'MMM DD'));
          var checkEndTime = moment().isSameOrAfter(moment(snapshot.endtime, 'hh:mm a'));
          if(checkEndDate && !checkEndTime)
            this.timeStatus[y] = 'ongoing';
          else if( !checkEndTime && !checkEndTime)
            this.timeStatus[y] = 'upcoming';
          else if (checkEndDate && checkEndTime)
            this.timeStatus[y] = 'archived';
        }
        y++;
      })
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
        this.facebookShare(event);
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
    this.navCtrl.push('MapPage');
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
    this.navCtrl.push('TapokContent', {param1: event.$key}); 
  }

  showFilterPopOver(myTapok){
    let popover = this.popoverCtrl.create(Filter);
    popover.present({
      ev: myTapok
    });
  }

  openAddTapok(){
    let modal = this.modalCtrl.create('AddTapok', { label: 'Add Tapok' });
    modal.present();
  }

  openSearch(){
    let modal = this.modalCtrl.create('SearchPage');
    modal.present();
  }

  showAttendees(key){
    this.navCtrl.push('AttendeesPage', { key: key  });
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
      "privelage": "member"
    }

    this.firebaseService.userTapok(eventKey, event.$key, status, tapok, attendee, attendeeKey, userKey);
  }

  facebookShare(event){
    this.sharingVar.shareViaFacebookWithPasteMessageHint("Event Name: " +event.name+"\nVenue: "+event.venue+
    "\nDate: "+event.date+"\nTime: "+event.time+"\n\nShared from Tapok",null,(event.photo).toString())
    .then((success)=>{
      
      }).catch((error)=>{
         alert(JSON.stringify(error));
      })
    }
}

