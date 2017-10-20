import { Component } from '@angular/core';
import { IonicPage, ViewController, AlertController, NavParams } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';
//import { FirebaseListObservable } from 'angularfire2/database';

@IonicPage()
@Component({
	selector: 'add-tapok',
	templateUrl: 'add-tapok.html'
})
export class AddTapok {
	label: any;

	event: any;
	host = '';
	name = '';
	date = '';
	time = '';
	venue = '';
	description = '';
	tapok = 0;
	search_key = '';

	chat: any;

	constructor(public viewCtrl: ViewController, public alertCtrl: AlertController, 
		public firebaseService: FireBaseService, public params: NavParams) {
			this.host = firebaseService.user;
			this.label = params.get('label');
			this.event = params.get('tapok');
			if(this.event != undefined)
				this.editTapok();
	}

	dismiss() {
		this.viewCtrl.dismiss();
	}

	addTapok() {
		this.event={
			"host": this.host,
			"name": this.name,
			"date": this.date,
			"time": this.time,
			"venue": this.venue,
			"description": this.description,
			"tapok": this.tapok,
			"search_key": this.name.toLowerCase()
		};

		this.chat={
			"name": this.name,
		}

		this.firebaseService.addEvent(this.event);
		this.firebaseService.addChat(this.chat);
		this.viewCtrl.dismiss();
		let alert = this.alertCtrl.create({
			title: 'Tapok Added',
			buttons: [ 'OK' ]
		});
		alert.present();
	}

	editTapok(){
		this.name = this.event.name;
		this.date = this.event.date;
		this.time = this.event.time;
		this.venue = this.event.venue;
		this.description = this.event.description;
	}
}
