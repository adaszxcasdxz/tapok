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
      this.event = events;
      this.mainAdmin = events.host;
      if(this.user == events.host ){
        this.access = 'ok'; 
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

  ionViewDidLoad(){
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
    this.firebaseService.addAdmin(this.key, attendee);
    this.firebaseService.removeMember(this.key, attendee.$key);
  }

  removeAdmin(attendee){
    this.firebaseService.addMember(this.key, attendee);
    this.firebaseService.removeAdmin(this.key, attendee.$key);
    console.log(attendee.$key);
  }

  removeAdminMember(attendee){
    this.firebaseService.removeAdmin(this.key, attendee.$key);
  }
  removeMember(attendee){
    this.firebaseService.removeMember(this.key, attendee.$key);
  }

  kickAttendee(attendeeKey){
    this.firebaseService.kickAttendee(this.key, attendeeKey, this.userKey,this.value-1);
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
    });
  }

  editTapok(){
    let modal = this.modalCtrl.create('AddTapok', { key: this.key, tapok: this.event, label: "Edit Tapok" });
    modal.present();

    modal.onDidDismiss(data => {
      this.loadMap();
    });
  }

  deleteTapok(){
    var i, y;

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
            this.navCtrl.setRoot('EventPage');
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

  loadMap(){
    var i, eventLocation: any[] = [];
    this.geolocation.getCurrentPosition().then((position) => {
      
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
    console.log(status);
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