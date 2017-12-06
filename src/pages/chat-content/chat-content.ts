import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';
import { Content } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'chat-content.html'
})
export class ChatContent {
  @ViewChild (Content) content: Content;
	event: any;
  timestamp = '';
  user: any;
  Message: any;
  chat: any;
  eKey: any;
  msgDisplay: any;
  List:any;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, 
    public firebaseService: FireBaseService,public params: NavParams) {
    this.event = params.get('event');
    console.log(this.event);
    this.eKey=this.event.$key;
    this.List=this.firebaseService.getChat(this.eKey);
  }

  ionViewDidEnter(){
    setTimeout(() => {
      this.content.scrollToBottom(300);
    });    
  }

  dismiss() {
		this.viewCtrl.dismiss();
  }
  
  sendMessage(){
    this.chat={
      "message": this.Message,
      "sentBy": this.firebaseService.getUser(),
      "timestamp": Date.now(),
    }
    this.firebaseService.sendMessage(this.chat, this.event.$key);
    this.Message="";

  }
}
