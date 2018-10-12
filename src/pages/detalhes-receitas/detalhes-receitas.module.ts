import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalhesReceitasPage } from './detalhes-receitas';

@NgModule({
  declarations: [
    DetalhesReceitasPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalhesReceitasPage),
  ],
})
export class DetalhesReceitasPageModule {}
