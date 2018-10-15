import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-add-item-modal',
  templateUrl: 'add-item-modal.html',
})
export class AddItemModalPage {

  public codigo = this.navParams.get('id');

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,) {
  }

  ionViewDidLoad() {
    console.log(this.codigo);
  }

  public sair() : void{
    this.viewCtrl.dismiss(this.codigo);
  }

}
