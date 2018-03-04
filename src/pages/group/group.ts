import { Component } from '@angular/core'
import { IonicPage, NavController, PopoverController, ModalController, NavParams, AlertController } from 'ionic-angular'
import { FireBaseService } from '../../providers/firebase-service';

@IonicPage()
@Component({
    selector: 'page-group',
    templateUrl: 'group.html'
})
export class GroupPage{

    Group: any;
    group: string="mygroup";
    public toggled = false;
    user: any;
    usergroup: any;
    groupmember: any;
    requestee: any;
    uGroup: any;
    status: any[] = [];
    userTest: any[] = [];
    groupTest: any[] = [];
    groupAttend: any[] = [];
    index = 0;
    photo: any;
    userid: any;
    gmember: any;
    key: any;
    Tags: any;
    i=0;
    count = 0;
    allcount = 0;

    constructor(
        public navCtrl: NavController, public popoverCtrl: PopoverController, public navParams: NavParams,
        public modalCtrl: ModalController, public firebaseService: FireBaseService, public alertCtrl: AlertController){
        var j = 0, k = 0;
        
        this.toggled = false;
        this.Group = this.firebaseService.getGroup();
        this.uGroup = this.firebaseService.getUserGroup();  
        this.photo = this.firebaseService.getPhotoURL();
        this.userid = this.firebaseService.getUserID();
        this.key = navParams.get('param1');
        this.gmember = this.firebaseService.getgroupAttend(this.key);
        this.user = firebaseService.user;
        this.Tags = this.firebaseService.getGroupTag();

        

        this.uGroup.subscribe(snapshot => { //
            this.userTest.length = 0;
            this.i = 0;
            snapshot.forEach(snap => {
                this.userTest[this.i] = snap.key;
                this.i++;
            })
            this.test();
        });

        this.Group.subscribe(snapshot => { //
            this.groupTest.length = 0;
            j = 0;
            snapshot.forEach(snap => {
                this.groupTest[j] = snap.$key;
                j++;
            })
            this.test();
        });
    }

    test(){
        this.status.length = 0;
        for(var x=0;x<this.groupTest.length;x++){
            this.status[x] = "UNJOINED";
            this.allcount++;
            for(var z=0;z<this.userTest.length;z++){
                if(this.groupTest[x]==this.userTest[z]){
                    this.status[x] = "JOINED";
                    this.count++;
                    this.allcount--;
                    break;
                }
            }
        }
    }

    testattend(ugroup, group){
        console.log("helo");
        console.log(this.groupAttend.length);
        for(var x=0;x<this.groupAttend.length;x++){
            if(this.groupAttend[x].userid==this.userid){
                this.groupmember = this.groupAttend[x];
                console.log(this.groupmember);
                break;
            }
            console.log(this.groupAttend[x].userid);
            console.log(this.userid);
        }

        console.log("hgg");
        let confirm = this.alertCtrl.create({
        title: 'You have successfully left the group.',
        buttons: [ 'OK' ]
        })
        let alert = this.alertCtrl.create({
        title: 'Leave Group?',
        buttons: [
            {
            text: 'YES',
            handler: () => {
                this.count--;
                this.firebaseService.leaveUserGroup(ugroup);
                this.firebaseService.removegroupAttend(group, this.groupmember.$key);
                //this.check();
                confirm.present();
            }
            },
            {
                text: 'NO',
            }
        ]
        });
        alert.present();
    }

    openGroupContent(group){
        this.navCtrl.push('GroupContent', {param1: group.$key});
    }

    requestJoin(key, admin, gname){
        this.requestee={
            "name": this.user,
            "photo": this.photo,
            "userid": this.userid
        }

         let confirm = this.alertCtrl.create({
			title: 'Your request has been sent!',
			buttons: [ 'OK' ]
        });
        let alert = this.alertCtrl.create({
        title: 'Join this group?',
        buttons: [  
            {
            text: 'YES',
            handler: () => {
                var notif = {
                    "name": this.user,
                    "admin": admin,
                    "type": 5,
                    "timestamp": 0-Date.now(),
                    "group_name": gname,
                    "group_key": key
                  }
                this.firebaseService.addNotif(admin, notif);  
                this.firebaseService.addRequestee(key, this.requestee);
                confirm.present();
                }
            },
            {
            text: 'NO',
            }
        ]
        });
        alert.present();
    }

    /*joinGroup(key, gname){
        this.usergroup={
            "key": key,
            "gname": gname,
            "timejoin": 0-Date.now()
        }  

        let confirm = this.alertCtrl.create({
			title: 'Group Joined!',
			buttons: [ 'OK' ]
        });
        let alert = this.alertCtrl.create({
        title: 'Join Group?',
        buttons: [  
            {
            text: 'YES',
            handler: () => {
                this.groupmember={
                    "name": this.user,
                    "photo": this.photo,
                    "userid": this.userid
                }
                this.firebaseService.addUserGroup(this.usergroup);  
                this.firebaseService.groupAttend(key, this.groupmember);
                this.navCtrl.setRoot('GroupPage');
                confirm.present();
            }
            },
            {
            text: 'NO',
            }
        ]
        });
        alert.present();
    }*/

    leaveGroup(ugroup, group){
        var i;
        this.gmember = this.firebaseService.getgroupAttend(group);
        /*this.gmember.subscribe(snapshot => {
            //this.groupAttend.length = 0;
            var k = 0;
            snapshot.forEach(snap => {
                
            console.log(this.gmember);
                this.groupAttend[k] = snap;
                console.log(this.groupAttend[k]);
                k++;
            })
            //this.testattend();
        });*/
        this.gmember.subscribe(snapshot => { //
            this.groupAttend.length = 0;
            i = 0;
            snapshot.forEach(snap => {
                this.groupAttend[i] = snap;
                i++;
            })
            this.testattend(ugroup, group);
        });
        
    }

    ionViewDidLoad(){
        this.Tags = this.firebaseService.getGroupTag();
    }
  

    openAddGroup(){
    let modal = this.modalCtrl.create('GroupAddPage', { label: 'Add Group' });
    modal.present();
   }

   openMap(){
    let modal = this.modalCtrl.create('MapPage');
    modal.present();
  }
  
  openSearch(){
    let modal = this.modalCtrl.create('SearchPage');
    modal.present();
  }

}