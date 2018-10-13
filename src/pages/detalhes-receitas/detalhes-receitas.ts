import { FormGroup, FormBuilder } from '@angular/forms';
import { Acoes } from './../../enums/acoes.enum';
import { ReceitasDTO } from './../../models/receitas.dto';
import { ReceitaService } from './../../services/domain/receita.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, Loading } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-detalhes-receitas',
  templateUrl: 'detalhes-receitas.html',
})
export class DetalhesReceitasPage {

  public codigo = this.navParams.get('id');
  public acao = this.navParams.get('acao');
  public receita: ReceitasDTO;
  public formGroup: FormGroup

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public receitaService: ReceitaService,
    public formBuilder: FormBuilder) {
      
    this.formGroup = formBuilder.group({
      titulo: [''],
      descricao: [''] 
    })
  }

  ionViewDidLoad() {  
    this.verificaAcao();
  }

  public verificaAcao() {
    switch(this.acao) {
      case Acoes.Editar :
      this.pesquisar();
      this.preencheCampos();
      break;

      case Acoes.Visualizar :
      this.pesquisar();
      break;
    }
  }

  public pesquisar() : Promise<any> {
    let carregando = this.carregando();
    const method = this.receitaService.pesquisar(this.codigo);
    method.subscribe(response => {
        this.receita = response;
        carregando.dismiss();
      }, error => {
        console.log(error);
      });
    return method.toPromise();
  }

  public preencheCampos() : Promise<any> {
    return new Promise((resolve, reject) => {
      this.pesquisar().then(data => {
        this.formGroup.controls.descricao.setValue(this.receita.descricao)
        this.formGroup.controls.titulo.setValue(this.receita.titulo)
      });
    });

  }

  public sair() : void{
    this.viewCtrl.dismiss(this.codigo);
  }

  public carregando() : Loading {
    const loader = this.loadingCtrl.create({
      content: "Carregando..."
    });
    loader.present();
    return loader;
  }

}
