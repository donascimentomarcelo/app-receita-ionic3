import { ReceitaService } from './../../services/domain/receita.service';
import { ReceitasDTO } from './../../models/receitas.dto';
import { ItemReceitaDTO } from './../../models/itemReceita.dto';
import { IngredientesDTO } from './../../models/ingredientes.dto';
import { IngredienteService } from './../../services/domain/ingrediente.service';
import { GrupoDTO } from './../../models/grupo.dto';
import { GrupoService } from './../../services/domain/grupo.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-add-item-modal',
  templateUrl: 'add-item-modal.html',
})
export class AddItemModalPage {

  public receita = this.navParams.get('receita');
  public grupos: GrupoDTO[];
  public ingredientes: IngredientesDTO[] = [];
  public ingrediente: IngredientesDTO;
  public ingrediente_id: string;
  public quantidade: number;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public grupoService: GrupoService,
    public ingredienteService: IngredienteService,
    public receitaService: ReceitaService,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.listarGrupos();
  }

  public sair() : void{
    this.viewCtrl.dismiss(this.receita);
  }

  public listarGrupos() {
    this.grupoService.listar()
      .subscribe(response => {
        this.grupos = response;
      }, error => {
        console.log(error);
      })
  }

  public listarIngredientes(grupo: number) {
    this.ingredienteService.pesquisarPorGrupo(grupo)
      .subscribe(response => {
       this.ingredientes = response;
      }, error => {
        console.log(error);
      });
  }

  public adicionar() {
    delete this.receita.itens;
    const itemReceita: ItemReceitaDTO = {
      engrediente: {id: this.ingrediente_id, descricao: null, medida: "GRAMAS"},
      receita: this.receita,
      quantidade: this.quantidade
    };
    this.receitaService.addItem(itemReceita)
      .subscribe(() => {
        this.sair();
      }, error  => {
        console.log(error)
      });
  }

  public mensagemSucesso() {
    const toast = this.toastCtrl.create({
      message: 'Item adicionado com sucesso!',
      duration: 5000
    });
    toast.present();
  }


}
