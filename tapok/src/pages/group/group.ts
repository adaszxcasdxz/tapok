import { Component } from '@angular/core'
import { NavController, PopoverController, ModalController } from 'ionic-angular'
import { GroupContent } from '../group-content/group-content'

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