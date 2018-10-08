import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IngredienteService } from '../../services/domain/ingrediente.service';
import { IngredientesDTO } from '../../models/ingredientes.dto';

@IonicPage()
@Component({
  selector: 'page-ingredientes',
  templateUrl: 'ingredientes.html',
})
export class IngredientesPage {

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public ingredienteService: IngredienteService) {
  }

  public ingredientes: IngredientesDTO[];

  ionViewDidLoad() {
    this.listarTodos();
  }

  public listarTodos() {
    this.ingredienteService.listarTodos()
      .subscribe(response => {
      this.ingredientes = response
    }, error => {
      console.log(error);
    });
  }

}
