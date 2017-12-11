import { Component } from '@angular/core'
import { IonicPage, NavController, PopoverController, ModalController } from 'ionic-angular'
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

    constructor(
        public navCtrl: NavController, public popoverCtrl: PopoverController, 
        public modalCtrl: ModalController, public firebaseService: FireBaseService){
        this.toggled = false;
        this.Group = this.firebaseService.getGroup();  
        this.user = firebaseService.user;
    }

    openGroupContent(group){
        this.navCtrl.push('GroupContent', {param1: group.$key});
    }

    openAddGroup(){
    let modal = this.modalCtrl.create('GroupAddPage', { label: 'Add Group' });
    modal.present();
   }

}