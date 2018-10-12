import { ReceitasDTO } from './../../models/receitas.dto';
import { ReceitaService } from './../../services/domain/receita.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController  } from 'ionic-angular';
import { DetalhesReceitasPage } from '../detalhes-receitas/detalhes-receitas';

@IonicPage()
@Component({
  selector: 'page-minhas-receitas',
  templateUrl: 'minhas-receitas.html',
})
export class MinhasReceitasPage {

  public minhasReceitas: ReceitasDTO[];
  tipoReceita: string = "completas";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public receitaService: ReceitaService,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.listarMinhasReceitas();
  } 

  public listarMinhasReceitas() {
    let carregando = this.carregando();
    this.receitaService.listarMinhasReceitas()
      .subscribe(response => {
        carregando.dismiss();
        this.minhasReceitas = response;
      }, error => {
        carregando.dismiss();
        console.log(error);
      });
  }

  carregando() {
    const loader = this.loadingCtrl.create({
      content: "Carregando..."
    });
    loader.present();
    return loader;
  }

  detalhes(id: number) {
    const modal = this.modalCtrl.create(DetalhesReceitasPage, {id: id});
    modal.onDidDismiss(data => {
      console.log(data);
    });
    modal.present();
  }


}
