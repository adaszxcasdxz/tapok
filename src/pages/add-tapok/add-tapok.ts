import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, ViewController, AlertController, NavParams, LoadingController, NavController, App, ModalController } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import * as moment from 'moment';
//import { FirebaseListObservable } from 'angularfire2/database';

declare var google;

@IonicPage()
@Component({
	selector: 'add-tapok',
	templateUrl: 'add-tapok.html'
})
export class AddTapok {
	@ViewChild('autocomplete') autocompleteElement: ElementRef;
	autocomplete;
	element: any;

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
	tapok = 1;
	search_key = '';
	timestamp = '';
	maxMembers = null;
	classification = 'General';
	dlURL: any;
	tags = 'false';
	lat = null;
	lng = null;
	filter = 'General';
	datetime = moment().format();
	checkdatetime;
	enddatetime = '';

	temp: any;
	tag: any;
	Tags: any;
	curTags: any;
	tagsTest: any[] = [];

	loading: any;
	selectedPhoto: any;
	photo = '';

	keyword: any;
	word: any;

	addEndDate = false;
	addEndTime = false;

	toggle = false;
	toggleMembers = true;

	event_key: any;
	wkey: any [] = [];

	inputLocation: any = 'false';

	user: any;
	Keywords: any;
	age: any;
	inc: any;

	onSuccess = (snapshot) => {
		this.photo = snapshot.downloadURL;
		this.loading.dismiss();
	}
	
	onError = (error) => {
		console.log('error', error);
		this.loading.dismiss();
	}

	chat: any;

	constructor(public viewCtrl: ViewController, public navCtrl: NavController, public alertCtrl: AlertController, 
		public firebaseService: FireBaseService, public params: NavParams, public camera: Camera, public loadingCtrl: LoadingController, public geolocation: Geolocation, public app: App, public modalCtrl: ModalController) {
		var y = 0;
		this.inc = 0;
		this.checkdatetime = this.datetime;

		this.host = firebaseService.user;
		this.label = params.get('label');
		this.event = params.get('tapok');
		this.event_key = params.get('key');
		this.user = this.firebaseService.getUser();
		this.age = this.firebaseService.getAge();
		console.log(this.event_key);	
		this.Tags = this.firebaseService.getTempTag();
	

		if(this.event != undefined)
			this.editTapokInfo();
	}

	ionViewDidLoad() {
		/*this.geolocation.getCurrentPosition().then((position) => {
			this.lat = position.coords.latitude;
			this.lng = position.coords.longitude;
		});*/

		//var defaultBounds = new google.maps.LatLngBounds(this.lat, this.lng);
		var options = {
			//bounds: defaultBounds,
			componentRestrictions: {country: "phl"}
		};

		this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteElement.nativeElement, options);

		/*this.autocomplete.addListener('place_changed', function(){
			console.log('test');
			//var place = this.autocomplete.getPlace();
			//console.log(place);
		});*/
	}

	toggleOptions(){
		if(this.toggle == false)
			this.toggle = true;
		else{
			this.toggle = false;
			this.maxMembers = null;
		}
	}

	getLat(){
		var place = this.autocomplete.getPlace();
		if(place != undefined)
			var lat = place.geometry.location.lat();

		return lat;
	}

	getLng(){
		var place = this.autocomplete.getPlace();
		if(place != undefined)
			var lng = place.geometry.location.lng();

		return lng;
	}

	dismiss() {
		this.viewCtrl.dismiss();
	}

	getLocation(){
		this.geolocation.getCurrentPosition().then((position) => {
			this.lat = position.coords.latitude;
			this.lng = position.coords.longitude;
		});
	}

	addTag(){
		if(this.temp!=null && this.temp!=''){
			this.tag = {
				"tags": this.temp
			}
			this.temp = '';
			this.tags = 'true';
			this.firebaseService.addTempTag(this.tag);
		}
	}

	deleteTag(key){
		this.firebaseService.deleteTempTag(key);
	}

	deleteCurrentTag(key){
		this.firebaseService.deleteTag(key);
	}

	addTapok() {
		var i, y, eventKey, wordkey, test;

		if(this.autocomplete.getPlace() != undefined){
			this.lat = this.getLat();
			this.lng = this.getLng();

			this.venue = document.getElementById('autocomplete')["value"];
			console.log(this.venue);
		}

		this.Tags.subscribe(snapshots => {
			this.tagsTest.length = 0;
			y = 0;
			snapshots.forEach(snapshot => {
				this.tagsTest[y] = snapshot.tags;
				y++;
			})
		});
		this.mDate = moment(this.datetime).format('MMM DD');
		this.mTime = moment(this.datetime).format('hh:mm a');
		
		if(this.addEndDate)
			this.mEndDate = moment(this.enddatetime).format('MMM DD');
		else
			this.mEndDate = '';
		if(this.addEndTime)
			this.mEndTime = moment(this.enddatetime).format('hh:mm a');
		else
			this.mEndTime = '';

		if(this.mDate == this.mEndDate)
			this.mEndDate = '';
		if(this.mTime == this.mEndTime)
			this.mEndTime = '';

		if(this.maxMembers != null){
			this.maxMembers = parseInt(this.maxMembers);
		}

		if(this.toggleMembers == true){
			this.maxMembers = null;
		}
		
		this.event={
			"host": this.host,
			"name": this.name,
			"photo": this.photo,
			"toggle": "false",
			"date": this.mDate,
			"datetime": this.datetime,
			"enddatetime": this.enddatetime,
			"addEndDate": this.addEndDate,
			"addEndTime": this.addEndTime,
			"time": this.mTime,
			"isotime": this.time,
			"endtime": this.mEndTime,
			"isoendtime": this.endtime,
			"enddate": this.mEndDate,
			"isoenddate": this.enddate,
			"venue": this.venue,
			"description": this.description,
			"tags": this.tags,
			"tapok": this.tapok,
			"max_members": this.maxMembers,
			"search_key": this.name.toLowerCase(),
			"timestamp": 0-Date.now(),
			"latitude": this.lat,
			"longitude": this.lng,
			"filter": this.filter
		};

		if(this.label == "Add Tapok"){
			eventKey = this.firebaseService.addEvent(this.event);
			var eventNotif = {
				'name': this.name,
				'key': eventKey
			}

			var notif = {
				"name": this.user,
				"type": 2,
				"timestamp": 0-Date.now(),
				"event_name": this.name,
				"event_key": eventKey
			}

			var followers = this.firebaseService.getAllFollowers();
			followers.subscribe(snapshot =>{
				snapshot.forEach(snap=>{
					this.firebaseService.addNotif(snap.name, notif);
				})
			});

			this.word = this.name.split(" ");
			for(i=0;i<this.word.length;i++){
				this.keyword={
					"keyword": this.word[i].toLowerCase(),
					"key": eventKey
				};
				this.firebaseService.addKeyword(this.keyword);
			}

			for(i=0;i<this.tagsTest.length;i++){
				this.tag={
					"tag": this.tagsTest[i].toLowerCase(),
					"key": eventKey
				}
				this.firebaseService.addTag(this.tag);
				if(i+1 == this.tagsTest.length)
					this.firebaseService.deleteAllTempTag();
			}	
		}
		else{
			console.log(this.event_key);
			eventKey = this.firebaseService.editEvent(this.event_key, this.event);
			
			console.log(this.name);
			this.Keywords.unsubscribe();
			this.word = this.name.split(" ");
			var temp: any[] = [];
			for(i=0;i<this.word.length;i++){
				for(var g=i+1;g<this.word.length;g++){
					if(this.word[i] == this.word[g])
						this.word[g] = null;
				}
			}
			console.log(this.word);
			for(i=0;i<this.word.length;i++){
				if(this.word[i] != null){
					this.keyword={
						"keyword": this.word[i].toLowerCase(),
						"key": this.event_key
					};
					console.log(this.word[i]);
					if(this.inc == 0)
						this.firebaseService.addKeyword(this.keyword);
				}
			};

			this.inc++;

			for(i=0;i<this.tagsTest.length;i++){
				this.tag={
					"tag": this.tagsTest[i].toLowerCase(),
					"key": this.event_key
				}
				this.firebaseService.addTag(this.tag);
				if(i+1 == this.tagsTest.length)
					this.firebaseService.deleteAllTempTag();
			}		
		}
		this.cancel();
		if(this.label == 'Add Tapok'){
			let alert = this.alertCtrl.create({
				title: 'Tapok Added',
				buttons: [ 
					{
						text: 'close',
					},
					{
						text: 'VIEW EVENT',
						handler: () => {					
							this.navCtrl.setRoot('TabsPage');
							let contentModal = this.modalCtrl.create('TapokContent', {param1: eventKey, type: "JOINED"});
    						contentModal.present();
						}
					}
				]
			});
			alert.present();
		}
		else{
			let alert = this.alertCtrl.create({
				title: 'Tapok Edited',
				buttons: [ 
					{
						text: 'close'
					}
				]
			});	
			alert.present();
		}
		
	}

	cancel(){
		this.viewCtrl.dismiss();
	}

	editTapokInfo(){
		console.log(this.event);

		this.host = this.event.host;
		this.name = this.event.name;
		this.photo = this.event.photo;
		//this.toggle = this.event.toggle;
		this.datetime = this.event.datetime;
		if(this.enddatetime != null)
			this.enddatetime = this.event.enddatetime;
		else	
			this.enddatetime = this.event.datetime;
		this.addEndDate = this.event.addEndDate;
		this.addEndTime = this.event.addEndTime;
		this.date = this.event.isodate;
		this.time = this.event.isotime;
		this.enddate = this.event.isoenddate;
		this.endtime = this.event.isoendtime;
		this.venue = this.event.venue;
		this.description = this.event.description;
		this.tags = this.event.tags;
		this.tapok = this.event.tapok;
		if(this.event.max_members != null){
			this.maxMembers = this.event.max_members;
			this.toggleMembers = false;
		}
		this.lat = this.event.latitude;
		this.lng = this.event.longitude;

		this.curTags = this.firebaseService.getTag();

		if(this.event.enddate != ""){
			this.addEndDate = true;
		}
		if(this.event.endtime != ""){
			this.addEndTime = true;
		}
		var wordkey = this.firebaseService.getAllKeywords();

		this.Keywords = wordkey.subscribe(snapshot => { 
			let i = 0, x = 0;
			snapshot.forEach(snap => {
				  if(snap.key == this.event_key){
					this.wkey[i] = snap.$key;
					i++;
				}
			});
			for(x=0;x<this.wkey.length;x++)
				this.firebaseService.deleteKeywords(this.wkey[x]);
		});
	}

	endDate(){
		if(this.addEndDate == false){
			this.addEndDate = true;
			if(this.enddatetime == '' || this.enddatetime == null)
				this.enddatetime = this.datetime;
		}
		else{
			this.addEndDate = false;
			if(this.addEndTime&&moment(this.enddatetime).isBefore(this.datetime)){
				this.enddatetime = this.datetime;
				this.addEndTime = false;
			}
		}
	}

	endTime(){
		if(this.addEndTime == false){
			this.addEndTime = true;
			if(this.enddatetime == '')
				this.enddatetime = this.datetime;
		}
		else{
			this.addEndTime = false;	
		}
	}

	changeDate(){
		this.checkdatetime = this.datetime;
		console.log('datetime: ' + this.datetime);
		console.log('checkdatetime: ' + this.checkdatetime);
	}

	changeTime(){
		if(moment(this.datetime).isBefore(moment())){
			console.log('invalid');
			console.log(this.checkdatetime);
			this.datetime = moment().format();
		}
		this.enddatetime = this.datetime;
		console.log('datetime: ' + this.datetime);
	}

	changeEndTime(){
		if(moment(this.enddatetime).isBefore(this.datetime)&&!this.addEndDate){
			console.log(this.datetime);
			this.enddatetime = this.datetime;
			this.addEndTime = false;
		}
	}

	inputLocationToggle(ev, val){
		this.inputLocation = val;
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
