
// Angular
import { Component, ViewChild } from '@angular/core';

// RxJS
import { ReplaySubject } from "rxjs/ReplaySubject";
import { ArrayObservable } from "rxjs/observable/ArrayObservable";

// Ionic
import { Nav, Platform, MenuController, AlertController } from 'ionic-angular';

// Ionic Native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Side Menu Component
import { SideMenuSettings } from './../shared/side-menu-content/models/side-menu-settings';
import { SideMenuOption } from './../shared/side-menu-content/models/side-menu-option';
import { SideMenuContentComponent } from './../shared/side-menu-content/side-menu-content.component';

// Serviços
import { AuthService } from '../services/auth.service';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	// Get the instance to call the public methods
	@ViewChild(SideMenuContentComponent) sideMenu: SideMenuContentComponent;

	public rootPage: any = 'HomePage';

	// Options to show in the SideMenuContentComponent
	public options: Array<SideMenuOption>;

	// Settings for the SideMenuContentComponent
	public sideMenuSettings: SideMenuSettings = {
		accordionMode: true, // Se false permite que todos os menus possam ser abertos simultaneamente
		showSelectedOption: true,
		selectedOptionClass: 'active-side-menu-option'		
	};

	private unreadCountObservable: any = new ReplaySubject<number>(0);

	constructor(private platform: Platform,
				private statusBar: StatusBar,
				private splashScreen: SplashScreen,
				private alertCtrl: AlertController,
				public auth: AuthService,
				private menuCtrl: MenuController) {
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleLightContent();
			this.splashScreen.hide();

			// Initialize some options
			this.initializeOptions();
		});

		// Change the value for the batch every 5 seconds
		setInterval(() => {
			this.unreadCountObservable.next(Math.floor(Math.random() * 10) + 1);
		}, 5000);

	}

	// Opções exibidas no menu
	private initializeOptions(): void {
		this.options = new Array<SideMenuOption>();

		// Opções do menu de Administrador
		this.options.push({
			displayText: 'Administrador',
			suboptions: [
				{
					iconName: 'people',
					displayText: 'Clientes',
					component: 'ClientesPage'
				},					
				{
					iconName: 'cloud-outline',
					displayText: 'Fornecedores',
					component: 'FornecedoresPage'
				},
				{
					iconName: 'at',
					displayText: 'Pedidos',
					component: 'PedidosPage'
				},
				{
					iconName: 'cart',
					displayText: 'Produtos',
					component: 'ProdutosPage'
				},
				{
					iconName: 'briefcase',
					displayText: 'Vendedores',
					component: 'VendedoresPage'
				},
			]
		});
		
		// Opções do menu de Clientes
		this.options.push({
			displayText: 'Cliente',
			suboptions: [
				{
					iconName: 'settings',
					displayText: 'Perfil',
					component: 'ProfilePage'
				},
				{
					iconName: 'at',
					displayText: 'Pedidos',
					component: 'PedidosPage'
				},				
				{
					iconName: 'cart',
					displayText: 'Produtos',
					component: 'ProdutosPage'
				},
			]
		});

		// Opções do menu de Vendedores
		this.options.push({
			displayText: 'Vendedores',
			suboptions: [
				{
					iconName: 'settings',
					displayText: 'Perfil',
					component: 'ProfilePage'
				},
				{
					iconName: 'person',
					displayText: 'Clientes',
					component: 'ClientesPage'
				},				
				{
					iconName: 'at',
					displayText: 'Pedidos',
					component: 'PedidosPage'
				},
				{
					iconName: 'cart',
					displayText: 'Produtos',
					component: 'ProdutosPage'
				},
			]
		});

		this.options.push({
			iconName: 'bug',
			displayText: 'Dynamic Badge',
			badge: this.unreadCountObservable,
			component: 'DynamicBadgePage'
		});

		// Opções para sair do Sistema
		this.options.push({
			iconName: 'log-out',
			displayText: 'Sair',
			custom: {
				isLogout: true
			}
		});
	}

	// Na seleção das opções do menu
	public onOptionSelected(option: SideMenuOption): void {
		this.menuCtrl.close().then(() => {
			if (option.custom && option.custom.isLogin) {
				this.presentAlert('You\'ve clicked the login option!');
			} else if (option.custom && option.custom.isLogout) {
				// this.presentAlert('You\'ve clicked the logout option!');
				this.openPage({ title: 'Sair', component: '' });
			} else if (option.custom && option.custom.isExternalLink) {
				let url = option.custom.externalUrl;
				window.open(url, '_blank');
			} else {
				// Get the params if any
				const params = option.custom && option.custom.param;

				// Redirect to the selected page
				this.nav.setRoot(option.component, params);
			}
		});
	}

	// public collapseMenuOptions(): void {
	// 	this.sideMenu.collapseAllOptions();
	// }

	// Alert 
	public presentAlert(message: string): void {
		let alert = this.alertCtrl.create({
			title: 'Information',
			message: message,
			buttons: ['Ok']
		});
		alert.present();
	}

	// No click da opção do menu definido no 'app.html'
	openPage(page : {title:string, component:string}) {

	switch (page.title) {
		case 'Sair':
		this.auth.logout ();
		this.nav.setRoot('HomePage');
		break;

		default:
		this.nav.setRoot(page.component);
	}

	}

}
