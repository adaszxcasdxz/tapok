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
	key: any;

	event: any;
	host = '';
	name = '';
	date = '';
	time = '';
	venue = '';
	description = '';
	tapok = 0;
	search_key = '';

	addEndDate = false;
	addEndTime = false;

	chat: any;

	constructor(public viewCtrl: ViewController, public alertCtrl: AlertController, 
		public firebaseService: FireBaseService, public params: NavParams) {
			this.host = firebaseService.user;
			this.label = params.get('label');
			this.event = params.get('tapok');
			if(this.event != undefined)
				this.editTapokInfo();
	}

	dismiss() {
		this.viewCtrl.dismiss();
	}

	generateTapok() {
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

		if(this.label == "Add Tapok")
			this.firebaseService.addEvent(this.event);
		else
			this.firebaseService.editEvent(this.key, this.event);
		this.cancel();
		let alert = this.alertCtrl.create({
			title: 'Tapok Added',
			buttons: [ 'OK' ]
		});
		alert.present();
	}

	cancel(){
		this.viewCtrl.dismiss();
	}

	editTapokInfo(){
		this.key = this.event.$key;
		this.name = this.event.name;
		this.date = this.event.date;
		this.time = this.event.time;
		this.venue = this.event.venue;
		this.description = this.event.description;
	}

	endDate(){
		if(this.addEndDate == false)
			this.addEndDate = true;
		else
			this.addEndDate = false;
	}

	endTime(){
		if(this.addEndTime == false)
			this.addEndTime = true;
		else
			this.addEndTime = false;	
	}
}
