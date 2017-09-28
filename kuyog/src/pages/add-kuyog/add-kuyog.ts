import { Component } from '@angular/core';
import { ViewController, AlertController } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';
//import { FirebaseListObservable } from 'angularfire2/database';

@Component({
	selector: 'add-kuyog',
	templateUrl: 'add-kuyog.html'
})
export class AddKuyog {

	eventTitle = '';
	eventPlace = '';
	eventDate = '';
	eventDetails;

	constructor(public viewCtrl: ViewController, public alertCtrl: AlertController, 
		public firebaseService: FireBaseService) {
	}

	dismiss() {
		this.viewCtrl.dismiss();
	}

	addKuyog() {
		this.eventDetails={
			"title": this.eventTitle,
			"place": this.eventPlace,
			"date": this.eventDate
		}
		this.firebaseService.addEvent(this.eventDetails);
		this.viewCtrl.dismiss();
		let alert = this.alertCtrl.create({
			title: 'Kuyog Added',
			buttons: [ 'OK' ]
		});
		alert.present();
	}
}
