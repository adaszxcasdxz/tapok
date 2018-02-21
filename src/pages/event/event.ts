import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, AlertController } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';
import * as moment from 'moment';
import {Observable} from 'rxjs/Rx';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'event.html'
})
export class EventPage {

  Event: any;
  Attending: any;
  user: any;
  attendees: any;
  eventTest: any[] = [];
  userTest: any[] = [];
  status: any;
  index = 0;
  index2 = 1;
  Tags: any;
  User: any;
  userEventKeys: any;
  pages: string = 'upcoming';
  timeStatus: any[] = [];
  eventTime: any[] = [];

  upcomingStatus: any;
  memberStatus: any[] = [];

  constructor(public navCtrl: NavController, public firebaseService: FireBaseService, public modalCtrl: ModalController, public alertCtrl: AlertController) {
    this.Event = this.firebaseService.getEvent();
    this.Attending = this.firebaseService.getUserEvents();
    this.User = this.firebaseService.getUsers();
    this.user = firebaseService.user;
    this.Tags = this.firebaseService.getTag();
    
    Observable.interval(5000)
    .subscribe((val) => {
      //console.log(moment().format('hh:mm:ss').toString()); 
      this.Event.subscribe(snapshots => {
        this.upcomingStatus = false;
        this.eventTime.length = 0;
        var y = 0;
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

    this.Attending.subscribe(snapshot => {
      this.userTest.length = 0;
      var i = 0;
      snapshot.forEach(snap => {
        this.userTest[i] = snap.key;
        i++;
      })
      this.test();
    });

    this.User.map(users => {
      this.userEventKeys = users;
      }).subscribe(data => {
        data;
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

  test(){
    this.status = "true";
    if(this.userTest[0] == null)
      this.status = "false";
  }

  openSearch(){
    let modal = this.modalCtrl.create('SearchPage');
    modal.present();
  }
  
  openMap(){
    let modal = this.modalCtrl.create('MapPage');
    modal.present();
  }

  openTapokContent(event){
    this.navCtrl.push('TapokContent', {param1: event.$key});
  }

  showAttendees(key){
    this.navCtrl.push('AttendeesPage', { key: key  });
  }

  confirm(event, status){
    if(status != "TAPOK"){
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
        console.log(userKey);
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
      "privelage": 'member'
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
    if(status != 'false'){
      console.log('asdad');
      if(memKey!='')
        this.firebaseService.removeMember(event.$key, memKey);
      else
        this.firebaseService.removeAdmin(event.$key, adminKey);
    }
  }

  viewPic(photo){
    let modal = this.modalCtrl.create('ViewPicturePage', { pic: photo });
    modal.present();
  }

  openEventContent(event){
    this.navCtrl.push('TapokContent', {param1: event.$key});
  }
}
