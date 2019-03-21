import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FornecedoresPage } from './fornecedores';

@NgModule({
  declarations: [
    FornecedoresPage,
  ],
  imports: [
    IonicPageModule.forChild(FornecedoresPage),
  ],
})
export class FornecedoresPageModule {}
