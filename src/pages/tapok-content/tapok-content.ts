import { IonicPage, NavController, ViewController, AlertController, NavParams, ModalController, PopoverController } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';
import { Popover } from 'ionic-angular/components/popover/popover';
import { FirebaseApp } from 'angularfire2';
import { Content } from 'ionic-angular';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@IonicPage()
@Component({
  selector: 'tapok-content',
  templateUrl: 'tapok-content.html'
})
export class TapokContent {
  @ViewChild (Content) content: Content;
  event: any;
  key: any;
  user: any;
  User: any;
  Keyword: any;
  keyword: any[] = [];
  userEventKeys: any;
  userTest: any[] = [];
  status: any;
  tabs: any;
  Tags: any;
  tag: any[] = [];
  Attendees: any;
  access: any;
  uid: any;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  lat: any[] = [];
  long: any[] = [];
  info: any[] = []; 
  currentLocation: any;
  toggle = false;
  List: any;
  Message: any;
  chat: any;
  tab: any;
  mainAdmin: any;
  value: any;
  userKey: any; 
  Admins: any;
  Members: any;
  adminCheck: any = false;
  hostCheck: any = false;
  type: any;
  Attendee: any[] = [];
  page: any;

  constructor(
    public navCtrl: NavController, public viewCtrl: ViewController, public alertCtrl: AlertController,
    public navParams: NavParams, public modalCtrl: ModalController, public firebaseService: FireBaseService, public popoverCtrl: PopoverController, public geolocation: Geolocation, public firebaseApp: FirebaseApp
  ){
    var i = 0,y = 0;
    this.tabs = 'info';
    this.tab = 'details';
    this.user = this.firebaseService.getUser();
    //this.uid = this.firebaseService.getUserID();
    this.key = navParams.get('param1');
    this.event = this.firebaseService.getSpecificEvent(this.key); 
    //this.event = params.get('event');
    this.user = this.firebaseService.getUser();
    this.List=this.firebaseService.getChat(this.key, this.content);
    this.Members = this.firebaseService.getMembers(this.key);
    this.Admins = this.firebaseService.getAdmins(this.key);
    this.type = this.navParams.get('type');
    this.page = this.navParams.get('page');

    console.log(this.type);
    this.Admins.subscribe(snapshot => {
      snapshot.forEach(snap => {
        if(this.user == snap.name ){
          this.access = 'ok';
          this.adminCheck = true; 
        }
      })
    });

    this.Members.subscribe(snapshot => {
      snapshot.forEach(snap => {
        if(this.user == snap.name ){
          this.access = 'ok'; 
        }
      })
    });

    this.event.forEach(events=> {
      var k = 0;
      this.event = events;
      this.mainAdmin = events.host;
      if(this.user == events.host ){
        this.access = 'ok'; 
        this.hostCheck = true;
      }
      for(var attendee in events.attendees){
        this.Attendee[k] = events.attendees[attendee].name;
        k++;
      }
    });

    this.Keyword = this.firebaseService.getKeywords(this.event.$key);
    this.Tags = this.firebaseService.getTag();
    this.Keyword.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.keyword[i] = snapshot.key;
        i++;
      });
    });

    this.Tags.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.tag[y] = snapshot.key;
        y++;
      });
    });

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

    //this.tapokID = this.tapokID = _params.get('tapokID');
    if(this.event.latitude != null && this.tab == 'details')
      this.loadMap();
  }

  test(){
    this.status;
    
    for(var z=0;z<this.userTest.length;z++){
      if(this.key!=this.userTest[z])
        this.status = "TAPOK";
      else{
        this.status = "JOINED";
        break;
      }   
    }
  }

  addAdmin(attendee){
    let confirm = this.alertCtrl.create({
      title: 'Admin Added',
      buttons: ['Ok']
    });
    let alert = this.alertCtrl.create({
      title: 'Add Admin?',
      buttons: [ 
        {
          text: 'Yes',
          handler: () => {					
            this.firebaseService.addAdmin(this.key, attendee);
            this.firebaseService.removeMember(this.key, attendee.$key);
            confirm.present();
          }
        },
        {
          text: 'No',
        }
      ]
    });
    alert.present();
  }

  removeAdmin(attendee){
    let confirm = this.alertCtrl.create({
      title: 'Admin Removed',
      buttons: ['Ok']
    });
    let alert = this.alertCtrl.create({
      title: 'Remove Admin?',
      buttons: [ 
        {
          text: 'Yes',
          handler: () => {					
            this.firebaseService.addMember(this.key, attendee);
            this.firebaseService.removeAdmin(this.key, attendee.$key);
            confirm.present();
          }
        },
        {
          text: 'No',
        }
      ]
    });
    alert.present();
  }

  removeAdminMember(attendee){
    let confirm = this.alertCtrl.create({
      title: 'Admin Removed',
      buttons: ['Ok']
    });
    let alert = this.alertCtrl.create({
      title: 'Remove Admin?',
      buttons: [ 
        {
          text: 'Yes',
          handler: () => {					
            this.firebaseService.removeAdmin(this.key, attendee.$key);
            confirm.present();
          }
        },
        {
          text: 'No',
        }
      ]
    });
    alert.present();
  }

  removeMember(attendee){
    let confirm = this.alertCtrl.create({
      title: 'Member Kicked',
      buttons: ['Ok']
    });
    let alert = this.alertCtrl.create({
      title: 'Kicked Member?',
      buttons: [ 
        {
          text: 'Yes',
          handler: () => {					
            this.firebaseService.removeMember(this.key, attendee.$key);
            confirm.present();
          }
        },
        {
          text: 'No',
        }
      ]
    });
    alert.present();
  }

  kickAttendee(attendeeKey){
    this.firebaseService.kickAttendee(this.key, attendeeKey, this.userKey,this.value-1);
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }
  
  toggleMap(){
    if(this.toggle)
      this.toggle = false;
    else
      this.toggle = true;
  }

  popOver(event){
    let popover = this.popoverCtrl.create('PopoverPage', {event: this.event, keyword: this.keyword});
    popover.present({
      ev: event
    });

    popover.onDidDismiss(data => {
      console.log(data);
      if(data=='edit')
        this.editTapok();
      if(data=='delete')
        this.deleteTapok();
      if(data=='archive')
        this.archiveTapok();
    });
  }

  archiveTapok(){
    let confirm = this.alertCtrl.create({
      title: 'Event Archived',
      buttons: ['Ok']
    });
    let alert = this.alertCtrl.create({
      title: 'Archive Event?',
      buttons: [ 
        {
          text: 'Yes',
          handler: () => {					
            var archive = {
              'status': 'archive'
            }
            this.firebaseService.editEvent(this.key, archive);
            this.firebaseService.deleteEvent(this.key);
            this.viewCtrl.dismiss();
            confirm.present();
          }
        },
        {
          text: 'No',
        }
      ]
    });
    alert.present();
  }

  editTapok(){
    let modal = this.modalCtrl.create('AddTapok', { key: this.key, tapok: this.event, label: "Edit Tapok", page: this.page });
    modal.present();

    modal.onDidDismiss(data => {
      this.loadMap();
    });
  }

  deleteTapok(){
    var i, y;

    var notif = {
      "name": this.user,
      "type": 8,
      "timestamp": 0-Date.now(),
      "event_name": this.event.name,
      "event_key": this.event.$key
    }

    let confirm = this.alertCtrl.create({
      title: 'Tapok Deleted',
      buttons: [ 'OK' ]
    });
    let alert = this.alertCtrl.create({
      title: 'Delete Tapok?',
      buttons: [ 
        {
          text: 'YES',
          handler: () => {
            this.firebaseService.deleteTapok(this.event.$key);
            for(i=0;i<this.keyword.length;i++)
              this.firebaseService.deleteKeyword(this.keyword[i]);  
            for(y=0;y<this.tag.length;y++)
              this.firebaseService.deleteTag(this.tag[y]);  
            for(var k=0;y<this.Attendee.length;k++){
              this.firebaseService.addNotif(this.Attendee[k].name, notif);
              console.log(this.Attendee[k].name);
            }
            this.viewCtrl.dismiss();
          }
        },
        {
          text: 'NO',
        }
      ]
    });
    alert.present(); 
  }

  loadMap(){
    var i, eventLocation: any[] = [];
    this.geolocation.getCurrentPosition().then((position) => {
      if(this.event.latitude != null){
        let latLng = new google.maps.LatLng(this.event.latitude, this.event.longitude);

        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        
        this.currentLocation = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          position: latLng
        });
      }

    }, (err) => {
      console.log(err);
    }); 
    
  }

  viewPic(photo){
    let modal = this.modalCtrl.create('ViewPicturePage', { pic: photo });
    modal.present();
  }

  showAttendees(key){
    this.navCtrl.push('AttendeesPage', { key: key  });
  }
  
  confirm(event, status){
    if(this.type == "JOIN"){
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
    }else if(this.type == "JOINED"){
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
    if(this.type == 'JOIN')
      var status = "false";
    else
     var status = "true";
    var tapok = event.tapok;
    var attendeeKey;
    var eventKey;
    var userKey;

    if(status){
      for(var attendees in event.attendees){
        if(event.attendees[attendees] == this.user){
          status = "true";
          attendeeKey = attendees;
          break;
        }
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

  ionViewDidEnter(){
    if(this.tab == 'chat'){
    setTimeout(() => {
      this.content.scrollToBottom(0);
      });
    }

    this.firebaseApp.database().ref("events/"+this.key+"/chat").on('value', snapshot => {
      setTimeout(() => {
        if(this.tab == 'chat')
          this.content.scrollToBottom(300);
      }); 
    });
    
  }

  ionViewWillEnter(){
    if(this.tab == 'chat')
      setTimeout(() => {
        this.content.scrollToBottom(300);
      });
  }
  
  changeTab(selection){
    this.tab = selection;
    if(this.tab == 'details')
      this.loadMap();
  }

  sendMessage(){
    this.chat={
      "message": this.Message,
      "sentBy": this.firebaseService.getUser(),
      "timestamp": Date.now(),
      "uid": this.firebaseService.getUserID(),
      "photo":this.firebaseService.getPhotoURL()
    }
    
    setTimeout(() => {
      this.content.scrollToBottom(300);//300ms animation speed
    });
    this.firebaseService.sendMessage(this.chat, this.key);
    this.Message="";
  }

  popoverChat(event){
    let popover = this.popoverCtrl.create('PopoverChatPage', {event: this.event, keyword: this.keyword});
    popover.present({
      ev: event
    });

    popover.onDidDismiss(data => {
      console.log(data);
      if(data=='smaller')
        this.textSmaller();
      if(data=='larger')
        this.textLarger();
    });
  }

  textSmaller(){

  }

  textLarger(){

  }
  
}