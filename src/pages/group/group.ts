import { Component } from '@angular/core'
import { IonicPage, NavController, PopoverController, ModalController, AlertController } from 'ionic-angular'
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
    uGroup: any;
    status: any[] = [];
    userTest: any[] = [];
    groupTest: any[] = [];
    index = 0;

    constructor(
        public navCtrl: NavController, public popoverCtrl: PopoverController, 
        public modalCtrl: ModalController, public firebaseService: FireBaseService, public alertCtrl: AlertController){
        var i = 0, j = 0;
        
        this.toggled = false;
        this.Group = this.firebaseService.getGroup();
        this.uGroup = this.firebaseService.getUserGroup();  
        //this.usergroup = this.firebaseService.getGroup();
        this.user = firebaseService.user;

        this.uGroup.subscribe(snapshot => { //
            this.userTest.length = 0;
            i = 0;
            snapshot.forEach(snap => {
                this.userTest[i] = snap.key;
                i++;
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

        console.log(this.groupTest);
        console.log(this.userTest);
    }

    test(){
        this.status.length = 0;
        for(var x=0;x<this.groupTest.length;x++){
            this.status[x] = "UNJOINED";
            for(var z=0;z<this.userTest.length;z++){
                if(this.groupTest[x]==this.userTest[z]){
                    this.status[x] = "JOINED";
                console.log("test");
                    break;
                }
            }
        }
    }

    openGroupContent(group){
        this.navCtrl.push('GroupContent', {param1: group.$key});
    }

    joinGroup(key, gname){
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
                this.firebaseService.addUserGroup(this.usergroup);  
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
    }

    leaveGroup(group){
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
                this.firebaseService.leaveUserGroup(group);
                console.log(group);
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

  

    openAddGroup(){
    let modal = this.modalCtrl.create('GroupAddPage', { label: 'Add Group' });
    modal.present();
   }

}