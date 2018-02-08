import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ViewController, AlertController, NavParams, ModalController, PopoverController } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';
import { Popover } from 'ionic-angular/components/popover/popover';
import { FirebaseApp } from 'angularfire2';
import { Content } from 'ionic-angular';

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
  timestamp = '';
  Message = '';
  chat: any;
  List: any;
  listen: any;
  uid: any;

  constructor(
    public navCtrl: NavController, public viewCtrl: ViewController, public alertCtrl: AlertController,
    public navParams: NavParams, public modalCtrl: ModalController, public firebaseService: FireBaseService, 
    public popoverCtrl: PopoverController, public firebaseApp: FirebaseApp
  ){
    var i = 0;
    this.tabs = 'info';
    this.user = this.firebaseService.getUser();
    this.uid = this.firebaseService.getUserID();
    this.key = navParams.get('param1');
    this.event = this.firebaseService.getSpecificEvent(this.key);
    //this.event = params.get('event');
    console.log(this.event);
    this.user = this.firebaseService.getUser();
    this.List=this.firebaseService.getChat(this.key, this.content);
    this.event.forEach(events=> {
      this.event = events;
    });
    this.Keyword = this.firebaseService.getKeywords(this.event.$key);
    this.Keyword.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.keyword[i] = snapshot.key;
        i++;
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
    let modal = this.modalCtrl.create('AddTapok', { tapok: this.event, label: "Edit Tapok" });
    modal.present();
  }

  deleteTapok(){
    var i;

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
            this.navCtrl.setRoot('TapokPage');
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

  viewPic(photo){
    let modal = this.modalCtrl.create('ViewPicturePage', { pic: photo });
    modal.present();
  }

  //openChatContent()
  //{
    //this.navCtrl.push('GroupContent', {param1: event.$key});
    //let modal = this.modalCtrl.create('ChatContent', { label: 'Chat',  event: this.event});
    //modal.present();
 // }
  
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

  ionViewDidEnter(){
    setTimeout(() => {
      this.content.scrollToBottom(0);
    });    

    this.firebaseApp.database().ref("events/"+this.key+"/chat").on('value', snapshot => {
      setTimeout(() => {
        this.content.scrollToBottom(300);
      }); 
    });
  }

  ionViewWillEnter(){
      setTimeout(() => {
        this.content.scrollToBottom(300);
      }); 
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
}