import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage() 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(
    public navCtrl: NavController, 
    public menu: MenuController,
    public auth: AuthService) {

  }

  ionViewWillEnter() {     
    this.menu.swipeEnable(false);   
  } 
 
  ionViewDidLeave() {     
    this.menu.swipeEnable(true);   
  } 

  ionViewDidEnter() {
    this.auth.refreshToken()
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('NavegacaoPage');
      },
      error => {});  
      // error => {this.navCtrl.setRoot('NavegacaoPage')});  
      
  }
  
  login() {
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
        this.navCtrl.setRoot('NavegacaoPage');
      },
      error => {});    
  }

  registrar() {
    // '.push': permite empilhar e voltar para anterior para pagina anterior
    this.navCtrl.push('SignupPage');
  }
}
