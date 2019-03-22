import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NavegacaoPage } from './navegacao';

@NgModule({
  declarations: [
    NavegacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(NavegacaoPage),
  ],
})
export class NavegacaoPageModule {}
