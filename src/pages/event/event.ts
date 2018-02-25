import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, AlertController, PopoverController } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';
import * as moment from 'moment';
import {Observable} from 'rxjs/Rx';
import { Popover } from 'ionic-angular/components/popover/popover';
import { SocialSharing } from '@ionic-native/social-sharing';


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
  status: any[] = [];
  index = 0;
  index2 = 1;
  Tags: any;
  User: any;
  userEventKeys: any;
  epages: string = 'eupcoming';
  etimeStatus: any[] = [];
  eventTime: any[] = [];

  upcomingStatus: any;
  memberStatus: any[] = [];

  eupcomingCount = 0;
  eongoingCount = 0;
  inc=0;

  constructor(public navCtrl: NavController, public firebaseService: FireBaseService, 
    public modalCtrl: ModalController, public alertCtrl: AlertController, public popoverCtrl: PopoverController,
    public sharingVar: SocialSharing) {

    this.Event = this.firebaseService.getEvent();
    this.Attending = this.firebaseService.getUserEvents();
    this.User = this.firebaseService.getUsers();
    this.user = firebaseService.user;
    this.Tags = this.firebaseService.getTag();
    
    Observable.interval(5000)
    .subscribe((val) => {
      this.inc = 0;
      this.timeCheck();
    });

    /*this.Attending.subscribe(snapshot => {
      this.userTest.length = 0;
      var i = 0;
      snapshot.forEach(snap => {
        this.userTest[i] = snap.key;
        i++;
      })
      this.test();
    });*/

    this.User.map(users => {
      this.userEventKeys = users;
      }).subscribe(data => {
        data;
    });

    this.User.subscribe(snapshot => { //
      this.userTest.length = 0;
      var i = 0;
      snapshot.forEach(snap => {
        this.userTest[i] = snap.key;
        i++;
      })
      this.test();
    }); //

    this.Event.subscribe(snapshots => { //
      this.eventTest.length = 0;
      var y = 0;
      snapshots.forEach(snapshot => {
        this.eventTest[y] = snapshot.$key;
        y++;
      })
      this.test();
    });
  }

  ionViewDidLoad(){
    this.Tags = this.firebaseService.getTag();
    this.timeCheck();
  }

  timeCheck(){
    this.eongoingCount = 0;
      this.eupcomingCount = 0;
      
      this.Event.subscribe(snapshots => {
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
          var day = moment(snapshot.date, 'MMM DD').date();
          var checkNotifDate = moment(day).isSameOrAfter(moment().date());
          var timeCheck = moment(snapshot.time,'hh:mm a').format('MMM DD, hh:mm a');
          var checkHour = moment(timeCheck, 'MMM DD, hh:mm a').fromNow();
          if(checkNotifDate){
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
          //if no end date and end time
          if(checkTime && checkDate && snapshot.enddate == ''){
            this.etimeStatus[y] = 'ongoing';
            this.firebaseService.updateEventStatus(snapshot.$key, 'ongoing');
          }
          //with end time but no end date
          else if(snapshot.endtime != '' && snapshot.enddate == ''){
            var checkEnd = moment().isSameOrAfter(moment(snapshot.endtime, 'hh:mm a'));
            if(checkEnd){
              this.etimeStatus[y] = 'archive';
              var archive = {
                status: 'archive'
              }
              this.firebaseService.editEvent(snapshot.$key, archive);
              this.firebaseService.updateEventStatus(snapshot.$key, 'archive');
              if(snapshot.status == null)
                this.firebaseService.addHistory(snapshot);
            } 
          }
          //with end date but no end time
          else if(snapshot.enddate != '' && snapshot.endtime == ''){
            var checkEnd = moment().isSameOrAfter(moment(snapshot.enddate, 'MMM DD'));
            if(checkEnd){
              this.etimeStatus[y] = 'ongoing';
              this.firebaseService.updateEventStatus(snapshot.$key, 'ongoing');
            }
          }
          //with end date and end time
          else if(snapshot.enddate != '' && snapshot.endtime != ''){
            var checkEndDate = moment().isSameOrAfter(moment(snapshot.enddate, 'MMM DD'));
            var checkEndTime = moment().isSameOrAfter(moment(snapshot.endtime, 'hh:mm a'));
            if(checkEndDate && !checkEndTime){
              this.etimeStatus[y] = 'ongoing';
              this.firebaseService.updateEventStatus(snapshot.$key, 'ongoing');
            }
            else if( !checkEndTime && !checkEndTime){
              this.etimeStatus[y] = 'upcoming';
              this.firebaseService.updateEventStatus(snapshot.$key, 'upcoming');
            }
            else if (checkEndDate && checkEndTime){
              this.etimeStatus[y] = 'archived';
              var archive = {
                status: 'archive'
              }
              this.firebaseService.editEvent(snapshot.$key, archive);
              this.firebaseService.updateEventStatus(snapshot.$key, 'archive');
              if(snapshot.status == null)
                this.firebaseService.addHistory(snapshot);
            }
          }
          else{
            this.etimeStatus[y] = 'upcoming';
            this.firebaseService.updateEventStatus(snapshot.$key, 'upcoming');
          }
          for(var x=0;x<this.etimeStatus.length;x++){
            if(this.status[x]=='JOINED'){
              if(this.etimeStatus[x]=='upcoming')
                this.eupcomingCount++;
              else if(this.etimeStatus[x]=='ongoing')
                this.eongoingCount++;
            }
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

  openSearch(){
    let modal = this.modalCtrl.create('SearchPage');
    modal.present();
  }
  
  openMap(){
    let modal = this.modalCtrl.create('MapPage');
    modal.present();
  }

  openTapokContent(event){
    let contentModal = this.modalCtrl.create('TapokContent', {param1: event.$key});
    contentModal.present();
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

  sharePopover(event){
    let popover = this.popoverCtrl.create('SharePopoverPage');
    popover.present();

    popover.onDidDismiss(data => {
      if(data=='facebook')
        this.facebookShare(event);
      if(data=='group')
        this.openGroupShare(event);
    });
  }

  facebookShare(event){
    this.sharingVar.shareViaFacebookWithPasteMessageHint("Event Name: " +event.name+"\nVenue: "+event.venue+
    "\nDate: "+event.date+"\nTime: "+event.time+"\n\nShared from Tapok",null,(event.photo).toString())
    .then((success)=>{
      
      }).catch((error)=>{
         alert(JSON.stringify(error));
      })
    }
  
    openGroupShare(event){
        console.log(event);
        this.navCtrl.push('ChooseGroupPage', {param1: event});
      }
}
