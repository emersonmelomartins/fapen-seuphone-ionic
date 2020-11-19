import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { FormCadastro } from './../../models/User';
import { UsersService } from 'src/app/services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  public formGroup: FormGroup;

  public form: FormCadastro = {
    usuario: {
      login: "",
      senha: "",
      email: "",
      pessoa: {
        nome: "",
        cpf: "",
        dtNascimento: "",
        sexo: "",
        celular: "",
        telefone: "",
              endereco: {
            uf: "",
            cidade: "",
            logradouro: "",
            bairro: "",
            cep: "",
            complemento: "",
            numero: 0, 
          }
      }
    },
    confirmaSenha: "",
    listaPerfil: 
       [ {
          authority: "ROLE_CLIENT",
          descricao: "Cliente do aplicativo"
        }]
      
  }


  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private navController: NavController,
    private toastController: ToastController,
    ) {
    
    this.formGroup = formBuilder.group({
      login: [
        this.form.usuario.login,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
        ]),
      ],
      senha: [
        this.form.usuario.senha,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
        ]),
      ],
      confirmarSenha: [
        this.form.confirmaSenha,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          //this.validatePassword
        ]),
      ],
      email: [
        this.form.usuario.email,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
        ]),
      ],
      nome: [
        this.form.usuario.pessoa.nome,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
        ]),
      ],
      dtNascimento: [
        this.form.usuario.pessoa.dtNascimento,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
        ]),
      ],
      sexo: [
        this.form.usuario.pessoa.sexo,
        Validators.compose([
          Validators.required,
        ]),
      ],
      cpf: [
        this.form.usuario.pessoa.cpf,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
        ]),
      ],
      cep: [
        this.form.usuario.pessoa.endereco.cep,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
        ]),
      ],
      logradouro: [
        this.form.usuario.pessoa.endereco.logradouro,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
        ]),
      ],
      numero: [
        this.form.usuario.pessoa.endereco.numero,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
        ]),
      ],
      bairro: [
        this.form.usuario.pessoa.endereco.bairro,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
        ]),
      ],
      cidade: [
        this.form.usuario.pessoa.endereco.cidade,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
        ]),
      ],
      uf: [
        this.form.usuario.pessoa.endereco.uf,
        Validators.compose([
          Validators.required,
        ]),
      ],
      celular: this.form.usuario.pessoa.celular,
      telefone: this.form.usuario.pessoa.telefone,
      complemento: this.form.usuario.pessoa.endereco.complemento
      
    });

   }

  ngOnInit() {
  }

  // validatePassword = (confirmPassword: FormControl): ValidatorFn => {
    
  //   if (this.formGroup) {
  //     console.log(this.formGroup.get('senha').value);
  //   }
  //   return null;
  // }

  async errorToast() {
    const toast = await this.toastController.create({
      color: "danger",
      header: "Erro !",
      message: "Ocorreu um Erro, tente novamente!",
      position: "top",
      duration: 4000
    });
    toast.present();
  }

  async successToast(message) {
    const toast = await this.toastController.create({
      color: 'success',
      position: 'top',
      header: 'SUCESSO!',
      message: message,
      duration: 3000
    });
    toast.present();
  }

  handleCadastrar() {
    this.userService.createUser(this.form).subscribe(
      (data) => {
        this.successToast("Usuário Criado com Sucesso !")
        this.navController.navigateForward("login/sucesso");
      },
      (error) => {
        this.errorToast()
      }
    )
  }

}
