import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MinhasReceitasPage } from './minhas-receitas';

@NgModule({
  declarations: [
    MinhasReceitasPage,
  ],
  imports: [
    IonicPageModule.forChild(MinhasReceitasPage),
  ],
})
export class MinhasReceitasPageModule {}
