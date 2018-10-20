import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pesquisar-receita',
  templateUrl: 'pesquisar-receita.html',
})
export class PesquisarReceitaPage {

  public tags = [];
  public arr = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PesquisarReceitaPage');
  }
  
  public onChange(val: string){
    console.log(val)
   
    this.arr = this.tags.map((tag) => {
      const arr = {
        label: 'ingrediente',
        value: tag
      }
      return arr;
    });
  }

  public pesquisar() {
    console.log(this.arr);
  }

}
