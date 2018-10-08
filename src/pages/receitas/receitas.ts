import { ReceitasFiltro } from './../../models/filtros/receita.filter';
import { ReceitasDTO } from './../../models/receitas.dto';
import { ReceitaService } from './../../services/domain/receita.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-receitas',
  templateUrl: 'receitas.html',
})
export class ReceitasPage {

  public formGroup: FormGroup;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public receitaService: ReceitaService,
      public formBuilder: FormBuilder) {

      this.formGroup = this.formBuilder.group({
        titulo: [''],
        descricao: ['']
      });
  }
  public receitas: ReceitasDTO[];

  ionViewDidLoad() {
    this.listarTodos();
  }

  public listarTodos() {
    this.receitaService.listarTodos()
      .subscribe(response => {
        this.receitas = response;
      }, error => {
        console.log(error);
      })  
  }

  public pesquisar() {
    const filtro: ReceitasFiltro = this.formGroup.value;
    this.receitaService.filtrar(filtro)
    .subscribe(response => {
      this.receitas = response;
    }, error => {
      console.log(error);
    })  
  }

  public limpar() {
    this.listarTodos();
    this.formGroup.reset();
  }

}
