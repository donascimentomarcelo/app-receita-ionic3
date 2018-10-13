import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  public receitasCompletas: ReceitasDTO[];
  public receitasIncompletas: ReceitasDTO[];
  public tipoReceita: string = "completas";
  public formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public receitaService: ReceitaService,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public formBuilder: FormBuilder) {

    this.formGroup = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      descricao: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    });
  }

  ionViewDidLoad() {
    this.listarMinhasReceitas();
  } 

  public listarMinhasReceitas() {
    let carregando = this.carregando();
    this.receitaService.listarMinhasReceitas()
      .subscribe(response => {
        carregando.dismiss();
        this.receitasCompletas = response['completas'];
        this.receitasIncompletas = response['incompletas'];
      }, error => {
        carregando.dismiss();
        console.log(error);
      });
  }

  public carregando() {
    const loader = this.loadingCtrl.create({
      content: "Carregando..."
    });
    loader.present();
    return loader;
  }

  public detalhes(id: number) {
    const modal = this.modalCtrl.create(DetalhesReceitasPage, {id: id});
    modal.onDidDismiss(data => {
      console.log(data);
    });
    modal.present();
  }

  public salvar() {
    if (this.formGroup.status === 'INVALID') {
      return;
    }
    const receita: ReceitasDTO = this.formGroup.value;
    this.receitaService.criar(receita)
      .subscribe(response => {
        console.log(response);
        this.listarMinhasReceitas();
      }, error => {
        console.log(error);
      });
  }

}
