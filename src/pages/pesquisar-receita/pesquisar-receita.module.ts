import { IonTagsInputModule } from 'ionic-tags-input';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PesquisarReceitaPage } from './pesquisar-receita';

@NgModule({
  declarations: [
    PesquisarReceitaPage,
  ],
  imports: [
    IonicPageModule.forChild(PesquisarReceitaPage),
    IonTagsInputModule,
  ],
})
export class PesquisarReceitaPageModule {}
