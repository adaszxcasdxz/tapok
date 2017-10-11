import { Component } from '@angular/core';
import { ViewController, AlertController } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';
//import { FirebaseListObservable } from 'angularfire2/database';

@Component({
	selector: 'add-kuyog',
	templateUrl: 'add-kuyog.html'
})
export class AddKuyog {

	event;
	name = '';
	date = '';
	time = '';
	venue = '';
	description = '';

	constructor(public viewCtrl: ViewController, public alertCtrl: AlertController, 
		public firebaseService: FireBaseService) {
	}

	dismiss() {
		this.viewCtrl.dismiss();
	}

	addKuyog() {
		this.event={
			"name": this.name,
			"date": this.date,
			"time": this.time,
			"venue": this.venue,
			"description": this.description
		}
		this.firebaseService.addEvent(this.event);
		this.viewCtrl.dismiss();
		let alert = this.alertCtrl.create({
			title: 'Kuyog Added',
			buttons: [ 'OK' ]
		});
		alert.present();
	}
}
