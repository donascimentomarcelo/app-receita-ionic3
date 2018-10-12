import { ReceitasDTO } from './../../models/receitas.dto';
import { ReceitaService } from './../../services/domain/receita.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-detalhes-receitas',
  templateUrl: 'detalhes-receitas.html',
})
export class DetalhesReceitasPage {

  public codigo = this.navParams.get('id');
  public receita: ReceitasDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public receitaService: ReceitaService,) {
      
  }

  ionViewDidLoad() {
    this.pesquisar();  
  }

  pesquisar() {
    let carregando = this.carregando();
    this.receitaService.pesquisar(this.codigo)
      .subscribe(response => {
        this.receita = response;
        console.log(this.receita)
        carregando.dismiss();
      }, error => {
        console.log(error);
      })
  }

  sair() {
    this.viewCtrl.dismiss(this.codigo);
  }

  carregando() {
    const loader = this.loadingCtrl.create({
      content: "Carregando..."
    });
    loader.present();
    return loader;
  }

}
