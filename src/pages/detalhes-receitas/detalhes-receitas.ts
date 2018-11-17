import { ComentarioDTO } from './../../models/comentario.dto';
import { enviroment } from './../../enviroment/enviroment.dev';
import { AddItemModalPage } from './../add-item-modal/add-item-modal';
import { IngredientesDTO } from './../../models/ingredientes.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Acoes } from './../../enums/acoes.enum';
import { ReceitasDTO } from './../../models/receitas.dto';
import { ReceitaService } from './../../services/domain/receita.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, Loading, ToastController, AlertController, ModalController } from 'ionic-angular';
import { ItemReceitaDTO } from '../../models/itemReceita.dto';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import $ from 'jquery';

@IonicPage()
@Component({
  selector: 'page-detalhes-receitas',
  templateUrl: 'detalhes-receitas.html',
})
export class DetalhesReceitasPage {

  public codigo = this.navParams.get('id');
  public acao = this.navParams.get('acao');
  public receita: ReceitasDTO;
  public formGroup: FormGroup;
  public resposta: any[] = [];
  public respostas = [];
  private stompClient;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public receitaService: ReceitaService,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public modalCtrl: ModalController) {
    this.initializeWebSocketConnection();
    this.formGroup = formBuilder.group({
      titulo: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      descricao: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]] 
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

  public salvar() {
    const receita: ReceitasDTO = this.formGroup.value;
    const id: number = this.codigo;
    this.receitaService.alterar(receita, id)
      .subscribe(response => {
        console.log(response);
        this.mensagemSucesso();
      }, error => {
        console.log(error);
      });
  }

  public removerItem(receita: ReceitasDTO, ingrediente: IngredientesDTO) {
    let receitaClone: ReceitasDTO = Object.assign({},receita);
    delete receitaClone.itens;
    const itemReceita: ItemReceitaDTO = {
      engrediente: ingrediente,
      receita: receitaClone,
      quantidade: null
    };
    
    this.receitaService.desmontar(itemReceita)
      .subscribe(response => {
        this.pesquisar();
      }, error => {
        console.log(error);
      })
  }

  public confirmarRemocaoDeItem(receita: ReceitasDTO, ingrediente: IngredientesDTO) {
    let alert = this.alertCtrl.create({
      title: 'Confirmar remoção',
      message: 'Tem certeza que deseja remover esse item?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar',
          handler: () => {
            alert.dismiss();
            return false;
          }
        },
        {
          text: 'Remover',
          handler: () => {
            this.removerItem(receita, ingrediente);
          }
        }
      ]
    });
    alert.present();
  }

  public abreModalParaAdicionar() : void {
    const modal = this.modalCtrl.create(AddItemModalPage, {receita: this.receita});
    modal.onDidDismiss(data => {
      this.pesquisar();
    });
    modal.present();
  }

  public mensagemSucesso() {
    const toast = this.toastCtrl.create({
      message: 'Receita atualizada com sucesso',
      duration: 5000
    });
    toast.present();
  }

  sendMessage(comentario: ComentarioDTO){

    const mensagem = {
      comentario_id: comentario.id,
      usuario_id: null,
      receita_id: this.codigo,
      resposta: this.resposta.toString(),
    }
    
    this.resposta = [];
    console.log( this.resposta);
    this.stompClient.send("/app/send/message" , {}, JSON.stringify(mensagem));
  }

  initializeWebSocketConnection(){
    let ws = new SockJS(enviroment.socketUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    'use strict'
    const codigo_receita = this.codigo;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/chat", (message) => {
        if(message.body) {
          const resposta =  JSON.parse(message.body);
          if (resposta.receita_id == codigo_receita) {
            $(".resp-"+resposta.comentario_id).append("<div class='tabela-resposta'>"+resposta.resposta+"</div>")
            console.log(resposta);
          }
        }
      });
    });
  }

}
