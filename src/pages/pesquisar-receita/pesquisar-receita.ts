import { DetalhesReceitasPage } from './../detalhes-receitas/detalhes-receitas';
import { Acoes } from './../../enums/acoes.enum';
import { ReceitasDTO } from './../../models/receitas.dto';
import { ReceitaService } from './../../services/domain/receita.service';
import { TagDTO } from './../../models/tag.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pesquisar-receita',
  templateUrl: 'pesquisar-receita.html',
})
export class PesquisarReceitaPage {

  public tags: TagDTO[] = [];
  public arr = [];
  public receitas: ReceitasDTO[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public receitaService: ReceitaService,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PesquisarReceitaPage');
  }
  
  public onChange(val: string){
    console.log(val)
   
    this.arr = this.tags.map((tag) => {
      const arr = {
        valor: tag
      }
      return arr;
    });
  }

  public pesquisar() {
    let carregando = this.carregando();
    this.receitaService.pesquisarReceitas(this.arr)
      .subscribe(response => {
        this.receitas = response;
        carregando.dismiss();
      }, error => {
        console.log(error);
      })
  }

  public carregando() {
    const loader = this.loadingCtrl.create({
      content: "Carregando..."
    });
    loader.present();
    return loader;
  }

  public detalhes(id: number) {
      
    const modal = this.modalCtrl.create(DetalhesReceitasPage, {id: id, acao: Acoes.Visualizar});
    let carregando = this.carregando();
    setTimeout(() => {
      modal.present();
      carregando.dismiss();
    }, 1000);
  }

}
