import { Component } from '@angular/core';
import { ViewController, NavController, IonicPage, AlertController, NavParams, LoadingController } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the GroupAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-group-add',
  templateUrl: 'group-add.html',
})

export class GroupAddPage {

  key: any;
  group: any;
  label: any;
	user: any;
	usergroup: any;
	test: any;

  loading: any;
  selectedPhoto: any;
  dlURL: any;
  photo = '';
  
  admin = '';
  gname = '';
  gdescr = '';
	timestamp = '';
	adminid: any;

  onSuccess = (snapshot) => {
		this.photo = snapshot.downloadURL;
		this.loading.dismiss();
	}
	
	onError = (error) => {
		console.log('error', error);
		this.loading.dismiss();
	}

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
     public firebaseService:FireBaseService, public viewCtrl: ViewController, public camera: Camera, public params: NavParams, public loadingCtrl: LoadingController) {
				this.admin = firebaseService.user;
				this.adminid = this.firebaseService.getUserID();
        this.label = params.get('label');
			  this.group = params.get('tapok');
        if(this.group != undefined)
				  this.editGroupInfo();
  }

  dismiss() {
		this.viewCtrl.dismiss();
  }
  
  addGroup(){
    this.group={
      "gname": this.gname,
      "gdescr": this.gdescr,
      "admin": this.admin,
			"timestamp": 0-Date.now(),
			"photo": this.photo,
			"adminid": this.adminid,
		}

    if(this.label == "Add Group"){
			this.firebaseService.addGroup(this.group);
			//this.firebaseService.addUserGroup(this.usergroup);
		}

		this.test = this.group.$key;
		console.log(this.test);

		//this.test = this.firebaseService.getSpecificGroup(this.group.$key);
		//console.log(this.test);
		//this.addUserGroup(this.test);
		this.cancel();
		let alert = this.alertCtrl.create({
			title: 'Group Created',
			buttons: [ 'OK' ]
		});
    alert.present();
	}
	
	addUserGroup(key){
		console.log(key);
		this.usergroup={
						"key": key,
            "gname": this.gname,
            "timejoin": 0-Date.now()
    }  
		
		this.firebaseService.addUserGroup(this.usergroup);
	}

  editGroup(){
		this.group={
			"gname": this.gname,
			"gdescr": this.gdescr,
			"photo": this.photo
		};

		this.firebaseService.editGroups(this.key, this.group);
		this.cancel();
		let alert = this.alertCtrl.create({
			title: 'Changes Saved.',
			buttons: [ 'OK' ]
		});
    alert.present();
  }
  
  cancel(){
		this.viewCtrl.dismiss();
  }
  
  editGroupInfo(){
		this.key = this.group.$key;
		this.gname = this.group.gname;
		this.gdescr = this.group.gdescr;
		this.photo = this.group.photo;
	}

  ionViewDidLoad() {
    console.log('Test');
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
