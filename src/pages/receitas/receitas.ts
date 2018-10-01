import { ReceitasDTO } from './../../models/receitas.dto';
import { ReceitaService } from './../../services/domain/receita.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-receitas',
  templateUrl: 'receitas.html',
})
export class ReceitasPage {

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public receitaService: ReceitaService) {
  }
  public receitas: ReceitasDTO[];

  ionViewDidLoad() {
    this.listarTodos();
  }

  listarTodos() {
    this.receitaService.listarTodos()
      .subscribe(response => {
        this.receitas = response;
      }, error => {
        console.log(error);
      })  
  }

}
