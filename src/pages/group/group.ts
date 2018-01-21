import { Component } from '@angular/core'
import { IonicPage, NavController, PopoverController, ModalController } from 'ionic-angular'
import { FireBaseService } from '../../providers/firebase-service';
import { FirebaseListObservable } from 'angularfire2/database';

@IonicPage()
@Component({
    selector: 'page-group',
    templateUrl: 'group.html'
})
export class GroupPage{

    Group: FirebaseListObservable<any[]>;
    group: string="mygroup";
    public toggled = false;

    constructor(
        public navCtrl: NavController, public popoverCtrl: PopoverController, 
        public modalCtrl: ModalController, public firebaseService: FireBaseService){
        this.toggled = false;
        this.Group = this.firebaseService.getGroup();    
    }

    openGroupContent(group){
        this.navCtrl.push('GroupContent', {param1: event});
    }

    openAddGroup(){
    let modal = this.modalCtrl.create('GroupAddPage');
    modal.present();
   }

}