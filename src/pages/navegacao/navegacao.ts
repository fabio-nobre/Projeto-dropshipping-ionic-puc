import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-navegacao',
  templateUrl: 'navegacao.html',
})
export class NavegacaoPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NavegacaoPage');
  }

  onCLick() {
    // this.navCtrl.push('HomePage');
    this.navCtrl.setRoot('HomePage');
    }

}
