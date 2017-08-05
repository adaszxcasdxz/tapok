import { Component } from '@angular/core';
import { ViewController, AlertController } from 'ionic-angular';

@Component({
    templateUrl: 'add-kuyog.html'
})
export class AddKuyog{
    constructor(public viewCtrl: ViewController, public alertCtrl: AlertController){

    }

    dismiss(){
        this.viewCtrl.dismiss();
    }

    addKuyog(){
        this.viewCtrl.dismiss();
        let alert = this.alertCtrl.create({
        title: 'Kuyog Added',
        buttons: ['OK']
        });
        alert.present();
    }
}