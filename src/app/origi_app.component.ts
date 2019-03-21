import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: String = 'HomePage';

  pages: Array<{title: string, component: String}>;

  constructor(
      public platform: Platform, 
      public statusBar: StatusBar, 
      public splashScreen: SplashScreen,
      public auth: AuthService
    ) {
    this.initializeApp();

    this.pages = [
      { title: 'Admin', component: 'AdministradoresPage' },
      { title: 'Categorias', component: 'CategoriasPage' },
      { title: 'Fornecedores', component: 'FornecedoresPage' },
      { title: 'Vendedores', component: 'VendedoresPage' },
      { title: 'Produtos', component: 'ProdutosPage' },
      { title: 'Profile', component: 'ProfilePage' },
      { title: '', component: '' },
      { title: '', component: '' },
      { title: 'Sair', component: '' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  // No click da opção do menu definido no 'app.html'
  openPage(page : {title:string, component:string}) {

    switch (page.title) {
      case 'Sair':
      this.auth.logout ();
      this.nav.setRoot(HomePage);
      break;

      default:
      this.nav.setRoot(page.component);
    }

  }
}