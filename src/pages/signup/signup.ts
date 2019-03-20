import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { ClienteService } from '../../services/domain/cliente.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})

// Classe para cadastrar novo usuário no sistema
export class SignupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public clienteService: ClienteService,
    public alertCtrl: AlertController) {

    // Instanciando o FormGroup
    // Colocar os mesmos atributos que tem no formulario
    // Para cada atributo definir uma valor inicial e uma validação inicial básica no frontend 
    this.formGroup = this.formBuilder.group({

      // Nome inicial 'Joaquim', campo obrigatório com tamanho minimo 5 e máximo 120
      nome: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
      tipo : ['1', [Validators.required]],
      cpfOuCnpj : ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha : ['123', [Validators.required]],
      logradouro : ['Rua Via', [Validators.required]],
      numero : ['25', [Validators.required]],
      complemento : ['Apto 3', []],
      bairro : ['Copacabana', []],
      cep : ['10828333', [Validators.required]],
      telefone1 : ['977261827', [Validators.required]],
      telefone2 : ['', []],
      telefone3 : ['', []],
      estadoId : [null, [Validators.required]],
      cidadeId : [null, [Validators.required]]      
    });
  }

  // No carregamento da pagina de registro (signup.html)
  // Carregar os estados e atualizar e suas respectivas cidades
  ionViewDidLoad() {
    // estado.service.ts/EstadoService/findAll() -> api.config.ts/API_CONFIG.baseUrl/estados = "http://localhost:8080/estados" 
    // -> SprinBoot | projeto-puc-lojaDropshipping -> EstadoResource.java/findAll() -> EstadoService.java/findAll() 
    // -> EstadoRepository.java/findAllByOrderByNome()
    this.estadoService.findAll()
    .subscribe(response => {
      this.estados = response;
      this.formGroup.controls.estadoId.setValue(this.estados[0].id);
      this.updateCidades();
    },
    error => {});
  }
  
  // Carregar as cidades conforme estado selecionado
  updateCidades() {
    let estado_id = this.formGroup.value.estadoId;
    // cidade.service.ts/EstadoService/findAll(estado_id) -> api.config.ts/API_CONFIG.baseUrl/estados/{estadoId}/cidades = "http://localhost:8080/estados/{estadoId}/cidades" 
    // -> SprinBoot | projeto-puc-lojaDropshipping -> EstadoResource.java/findCidades(estadoId) -> CidadeService.java/findByEstado(estadoId) 
    // -> CidadeRepository.java/findCidades(estado_Id)
    this.cidadeService.findAll(estado_id)
    .subscribe(response => {
      this.cidades = response;
      this.formGroup.controls.cidadeId.setValue(null);
    },
    error => {});
  }
  
  // Cadastrar novo cliente com os dados informados no formulario (signup.html)
  signupUser() {
    console.log(this.formGroup.value);
    // cliente.service.ts/ClienteService/insert(ClienteDTO) -> api.config.ts/API_CONFIG.baseUrl/clientes = "http://localhost:8080/clientes , objClienteDTO"  
    // -> SprinBoot | projeto-puc-lojaDropshipping -> ClienteResource.java/insert(ClienteNewDTO objClienteDTO) -> ClienteService.java/insert(Cliente objCliente) 
    // -> ClienteRepository.java/save(objCliente)
    this.clienteService.insert(this.formGroup.value)
    .subscribe(response => {
        this.showInsertOk();
      },
      error => {});
  }

   showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
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
    alert.present();
  }	  
  
}