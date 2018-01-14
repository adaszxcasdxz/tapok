import { Component } from '@angular/core';
import { IonicPage, ViewController, AlertController, NavParams, LoadingController } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as moment from 'moment';
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
	date = moment().format();
	mDate: any;
	time = moment().format();
	mTime: any;
	enddate = '';
	mEndDate: any;
	endtime = '';
	mEndTime: any;
	venue = '';
	description = '';
	tapok = 0;
	search_key = '';
	timestamp = '';
	dlURL: any;

	loading: any;
	selectedPhoto: any;
	photo = '';

	keyword: any;
	word: any;

	addEndDate = false;
	addEndTime = false;

	onSuccess = (snapshot) => {
		this.photo = snapshot.downloadURL;
		this.loading.dismiss();
	}
	
	onError = (error) => {
		console.log('error', error);
		this.loading.dismiss();
	}

	chat: any;

	constructor(public viewCtrl: ViewController, public alertCtrl: AlertController, 
		public firebaseService: FireBaseService, public params: NavParams, public camera: Camera, public loadingCtrl: LoadingController) {
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
		var i, eventKey;

		this.mDate = moment(this.date).format('MMM DD');
		this.mTime = moment(this.time).format('hh:mm a');
		
		if(this.enddate != '')
			this.mEndDate = moment(this.enddate).format('MMM DD');
		else
			this.mEndDate = '';
		if(this.endtime != '')
			this.mEndTime = moment(this.endtime).format('hh:mm a');
		else
			this.mEndTime = '';

		this.event={
			"host": this.host,
			"name": this.name,
			"photo": this.photo,
			"toggle": "false",
			"date": this.mDate,
			"time": this.mTime,
			"endtime": this.mEndTime,
			"enddate": this.mEndDate,
			"venue": this.venue,
			"description": this.description,
			"tapok": this.tapok,
			"search_key": this.name.toLowerCase(),
			"timestamp": 0-Date.now()
		};

		if(this.label == "Add Tapok")
			eventKey = this.firebaseService.addEvent(this.event);
		this.word = this.name.split(" ");
		for(i=0;i<this.word.length;i++){
			this.keyword={
				"keyword": this.word[i].toLowerCase(),
				"key": eventKey
			};
			this.firebaseService.addKeyword(this.keyword);
		}
		
		this.cancel();
		let alert = this.alertCtrl.create({
			title: 'Tapok Added',
			buttons: [ 'OK' ]
		});
		alert.present();
	}

	editTapok(){
		var eventKey;
		this.event={
			"host": this.host,
			"name": this.name,
			"photo": this.photo,
			"date": this.date,
			"time": this.time,
			"endtime": this.endtime,
			"enddate": this.enddate,
			"venue": this.venue,
			"description": this.description,
			"search_key": this.name.toLowerCase(),
			"timestamp": 0-Date.now()
		};

		this.word = this.name.split(" ");
		for(let i=0;i<this.word.length;i++){
			this.keyword={
				"keyword": this.word[i].toLowerCase(),
				"key": eventKey
			};
			this.firebaseService.addKeyword(this.keyword);
		}

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
		if(this.addEndDate == false){
			this.addEndDate = true;
			this.enddate = moment().format();
		}
		else{
			this.addEndDate = false;
			this.enddate = '';
		}
	}

	endTime(){
		if(this.addEndTime == false){
			this.addEndTime = true;
			this.endtime = moment().format();
		}
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
			this.loading = this.loadingCtrl.create({
				content: 'Please wait...'
			});
			this.loading.present();

			this.selectedPhoto = this.dateURItoBlob('data:image/jpeg;base64,' + imageData);

			this.upload();
		}, (err) => {
		});
	}

	dateURItoBlob(dataURI){
		let binary = atob(dataURI.split(',')[1]);
		let array = [];
		for (let i = 0; i < binary.length; i++) {
		  array.push(binary.charCodeAt(i));
		}
		return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
	}

	upload() {
		var key = this.firebaseService.addImageName();

		if (this.selectedPhoto) {
		  this.dlURL = this.firebaseService.uploadPhoto(this.selectedPhoto, key);
		  this.dlURL.then(this.onSuccess, this.onError);  
		}
	  }
}
