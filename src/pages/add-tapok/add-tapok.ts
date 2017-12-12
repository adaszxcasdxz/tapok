import { Component } from '@angular/core';
import { IonicPage, ViewController, AlertController, NavParams } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';
import { Camera, CameraOptions } from '@ionic-native/camera';
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
	enddate = '';
	endtime = '';
	venue = '';
	description = '';
	tapok = 0;
	search_key = '';
	timestamp = '';

	addEndDate = false;
	addEndTime = false;

	chat: any;

	constructor(public viewCtrl: ViewController, public alertCtrl: AlertController, 
		public firebaseService: FireBaseService, public params: NavParams, public camera: Camera) {
			this.host = firebaseService.user;
			this.label = params.get('label');
			this.event = params.get('tapok');
			if(this.event != undefined)
				this.editTapokInfo();
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
			"endtime": this.endtime,
			"enddate": this.enddate,
			"venue": this.venue,
			"description": this.description,
			"tapok": this.tapok,
			"search_key": this.name.toLowerCase(),
			"timestamp": 0-Date.now()
		};

		if(this.label == "Add Tapok")
			this.firebaseService.addEvent(this.event);
		this.cancel();
		let alert = this.alertCtrl.create({
			title: 'Tapok Added',
			buttons: [ 'OK' ]
		});
		alert.present();
	}

	editTapok(){
		this.event={
			"host": this.host,
			"name": this.name,
			"date": this.date,
			"time": this.time,
			"endtime": this.endtime,
			"enddate": this.enddate,
			"venue": this.venue,
			"description": this.description,
			"search_key": this.name.toLowerCase(),
			"timestamp": 0-Date.now()
		};

		this.firebaseService.editEvent(this.key, this.event);
		this.cancel();
		let alert = this.alertCtrl.create({
			title: 'Tapok Edited',
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
		this.enddate = this.event.enddate;
		this.endtime = this.event.endtime;
		this.venue = this.event.venue;
		this.description = this.event.description;

		if(this.event.enddate != "")
			this.addEndDate = true;
		if(this.event.endtime != "")
			this.addEndTime = true;
	}

	endDate(){
		if(this.addEndDate == false)
			this.addEndDate = true;
		else{
			this.addEndDate = false;
			this.enddate = '';
		}
	}

	endTime(){
		if(this.addEndTime == false)
			this.addEndTime = true;
		else{
			this.addEndTime = false;	
			this.endtime = '';
		}
	}

	openGallery(){
		const options: CameraOptions = {
			quality: 100,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			sourceType: 0
		  }
		  
		  this.uploadPhoto(options);
	}

	openCamera(){
		const options: CameraOptions = {
			quality: 100,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE
		  }

		  this.uploadPhoto(options);
	}

	uploadPhoto(options){
		this.camera.getPicture(options).then((imageData) => {
			this.firebaseService.uploadPhoto(imageData, this.name); 
		}, (err) => {
		});
	}
}
