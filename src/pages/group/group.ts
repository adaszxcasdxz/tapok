import { Component } from '@angular/core'
import { IonicPage, NavController, PopoverController, ModalController } from 'ionic-angular'
import { GroupContent } from '../group-content/group-content'

@IonicPage()
@Component({
    selector: 'page-group',
    templateUrl: 'group.html'
})
export class GroupPage{
    group: string="mygroup";
    public toggled = false;

    constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, public modalCtrl: ModalController){
        this.toggled = false;    
    }

    openGroupContent(){
        this.navCtrl.push(GroupContent, {});
    }

}