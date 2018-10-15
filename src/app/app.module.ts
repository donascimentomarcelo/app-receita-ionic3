import { AddItemModalPage } from './../pages/add-item-modal/add-item-modal';
import { DetalhesReceitasPage } from './../pages/detalhes-receitas/detalhes-receitas';
import { ReceitaService } from './../services/domain/receita.service';
import { IngredienteService } from './../services/domain/ingrediente.service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    DetalhesReceitasPage,
    AddItemModalPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DetalhesReceitasPage,
    AddItemModalPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    IngredienteService,
    ReceitaService
  ]
})
export class AppModule {}
