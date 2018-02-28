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
  groups: any;
  label: any;
	usergroup: any;
	test: any;

  loading: any;
  selectedPhoto: any;
  dlURL: any;
  gphoto = '';
	
	userid: any;
	photo: any;
	user: any;
	current: any;
	groupmember: any;

	tags = 'false';
	tag: any;
	temp: any;
	Tags: any;
	curTags: any;
	tagsTest: any[] = [];

	inputLocation: any = 'false';

  admin = '';
  gname = '';
  gdescr = '';
	timestamp = '';
	adminid: any;
	group_key: any;

  onSuccess = (snapshot) => {
		this.gphoto = snapshot.downloadURL;
		this.loading.dismiss();
	}
	
	onError = (error) => {
		console.log('error', error);
		this.loading.dismiss();
	}

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
     public firebaseService:FireBaseService, public viewCtrl: ViewController, public camera: Camera, public params: NavParams, public loadingCtrl: LoadingController) {
				var y;
		
				this.admin = firebaseService.user;
				this.adminid = this.firebaseService.getUserID();
				this.userid = this.firebaseService.getUserID();
				this.photo = this.firebaseService.getPhotoURL();
				this.current = this.firebaseService.getUser();
				this.user = firebaseService.user;
				this.Tags = this.firebaseService.getTempGTag();
				this.label = params.get('label');
				this.group_key = params.get('key');
				console.log(this.group_key);
				this.group = params.get('tapok');
				if(this.group != undefined)
				  this.editGroupInfo();

  }

  dismiss() {
		this.viewCtrl.dismiss();
  }
  
  addGroup(){
		var i, y;

		this.Tags.subscribe(snapshots => {
			this.tagsTest.length = 0;
			y = 0;
			snapshots.forEach(snapshot => {
				this.tagsTest[y] = snapshot.tags;
				y++;
			})
		});

    this.group={
      "gname": this.gname,
      "gdescr": this.gdescr,
      "admin": this.admin,
			"timestamp": 0-Date.now(),
			"datetime": Date.now(),
			"userphoto": this.photo,
			"photo": this.gphoto,
			"adminid": this.adminid,
			"search_key": this.gname.toLowerCase(),
			"tags": this.tags,
		}

    if(this.label == "Add Group"){
			var key = this.firebaseService.addGroup(this.group);
			this.usergroup={
            "key": key,
            "gname": this.gname,
            "timejoin": 0-Date.now()
			}  

			this.groupmember={
                    "name": this.admin,
                    "photo": this.photo,
                    "userid": this.userid
                }
					
			this.firebaseService.addUserGroup(this.current, this.usergroup);
			this.firebaseService.groupAttend(key, this.groupmember);

			for(i=0;i<this.tagsTest.length;i++){
				this.tag={
					"tag": this.tagsTest[i].toLowerCase(),
					"key": key
				}
				this.firebaseService.addGroupTag(this.tag);
				if(i+1 == this.tagsTest.length)
					this.firebaseService.deleteAllTempGTag();
			}	
		}
		
		/*if(this.label == "Edit Group"){
			var gkey = this.firebaseService.editGroups(this.group.$key, this.group);
			console.log(gkey);
			for(i=0;i<this.tagsTest.length;i++){
				this.tag={
					"tag": this.tagsTest[i].toLowerCase(),
					"key": gkey
				}
				console.log(this.tag.tag);
				this.firebaseService.addGroupTag(this.tag);
				if(i+1 == this.tagsTest.length)
					this.firebaseService.deleteAllTempGTag();
			}	
		}*/
		
		
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
		
		this.firebaseService.addUserGroup(this.current, this.usergroup);
	}
 
 	editGroup(){
		var i, y;

		this.Tags.subscribe(snapshots => {
			this.tagsTest.length = 0;
			y = 0;
			snapshots.forEach(snapshot => {
				this.tagsTest[y] = snapshot.tags;
				y++;
			})
		});

		this.groups={
			"gname": this.gname,
			"gdescr": this.gdescr,
			"photo": this.gphoto,
			"tags": this.tags,
		};
		//this.addGroup();
		console.log(this.tagsTest.length);
		var gkey = this.firebaseService.editGroups(this.group.$key, this.groups);

		for(i=0;i<this.tagsTest.length;i++){
			this.tag={
				"tag": this.tagsTest[i].toLowerCase(),
				"key": this.group.$key
			}
			console.log(this.tag.tag);
			this.firebaseService.addTag(this.tag);
			if(i+1 == this.tagsTest.length)
				this.firebaseService.deleteAllTempTag();
		}		

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
		this.gphoto = this.group.photo;
		this.tags = this.group.tags;

		this.curTags = this.firebaseService.getTag();
		console.log(this.curTags);
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

	addTag(){
		if(this.temp!=null && this.temp!=''){
			this.tag = {
				"tags": this.temp
			}
			this.temp = '';
			this.tags = 'true';
			this.firebaseService.addTempGTag(this.tag);
		}
	}

	deleteTag(key){
		this.firebaseService.deleteTempGTag(key);
	}

	deleteCurrentTag(key){
		this.firebaseService.deleteGroupTag(key);
	}

	inputLocationToggle(ev, val){
		this.inputLocation = val;
	}

}
