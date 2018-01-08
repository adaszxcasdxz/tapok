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
    uGroup: any

    constructor(
        public navCtrl: NavController, public popoverCtrl: PopoverController, 
        public modalCtrl: ModalController, public firebaseService: FireBaseService, public alertCtrl: AlertController){
        this.toggled = false;
        this.Group = this.firebaseService.getGroup();
        this.uGroup = this.firebaseService.getUserGroup();  
        this.user = firebaseService.user;
    }

    openGroupContent(group){
        this.navCtrl.push('GroupContent', {param1: group.$key});
    }

    joinGroup(key){
        this.usergroup={
            "key": key
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

    openAddGroup(){
    let modal = this.modalCtrl.create('GroupAddPage', { label: 'Add Group' });
    modal.present();
   }

}