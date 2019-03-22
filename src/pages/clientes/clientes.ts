import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from '../../services/domain/cliente.service';

/**
 * Generated class for the ClientesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-clientes',
  templateUrl: 'clientes.html',
})
export class ClientesPage {
  
  formGroup: FormGroup;
  nome: string;
  cpfOuCnpj: string;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public clienteService: ClienteService,
    public alertCtrl: AlertController
    ) {

    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, /* Validators.email */]]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientesPage');
  }

  consultarClinete(){
    this.clienteService.findByEmail(this.formGroup.value.email)
    .subscribe(response => {
      this.nome = response.nome;
      this.cpfOuCnpj = response.cpfOuCnpj;
      //this.formGroup.controls.nomeId.setValue(response.nome);
      console.log(response);

      //this.showInsertOk(response);
    },
    error => {});
  }
  
  showInsertOk(response) {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Consulta efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    console.log(response);
    alert.present();
  }

}
