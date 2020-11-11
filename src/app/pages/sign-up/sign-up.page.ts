import { UsersService } from 'src/app/services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { User, Pessoa, Endereco} from 'src/app/models/User';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  public formGroup: FormGroup;
  
    public endereco: Endereco = {
      cep: "" ,
      logradouro: "" ,
      numero: "" ,
      bairro: "" ,
      cidade: "" ,
      uf: "",
      complemento: "",
    }
  
  public pessoa: Pessoa = {
    nome: "",
    endereco: this.endereco,
    cpf: "",
    dtNascimento: "",
    sexo: "",
    celular: "",
    telefone: ""
  }

  public user: User = {
    pessoa: this.pessoa,
    login: "",
    senha: "",
    confirmarSenha: "",
    email: "",
  }

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService
    ) {
    
    this.formGroup = formBuilder.group({
      login: [
        this.user.login,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
        ]),
      ],
      senha: [
        this.user.senha,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
        ]),
      ],
      confirmarSenha: [
        this.user.confirmarSenha,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          this.validatePassword
        ]),
      ],
      email: [
        this.user.email,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
        ]),
      ],
      nome: [
        this.pessoa.nome,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
        ]),
      ],
      dtNascimento: [
        this.pessoa.dtNascimento,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
        ]),
      ],
      sexo: [
        this.pessoa.sexo,
        Validators.compose([
          Validators.required,
        ]),
      ],
      cpf: [
        this.pessoa.cpf,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
        ]),
      ],
      cep: [
        this.endereco.cep,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
        ]),
      ],
      logradouro: [
        this.endereco.logradouro,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
        ]),
      ],
      number: [
        this.endereco.numero,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
        ]),
      ],
      neighborhood: [
        this.endereco.bairro,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
        ]),
      ],
      city: [
        this.endereco.cidade,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
        ]),
      ],
      uf: [
        this.endereco.uf,
        Validators.compose([
          Validators.required,
        ]),
      ],
      
    });

   }

  ngOnInit() {
  }

  validatePassword = (confirmPassword: FormControl): ValidatorFn => {
    console.log(confirmPassword.value); 
    if (this.formGroup) {
      console.log(this.formGroup.get('senha').value);
    }
    return null;
  }


  handleCadastrar() {
    console.log(this.formGroup.getRawValue());
    this.userService.createUser(this.user).subscribe(
      (data) => {
        location.reload();
      },
      (error) => {
        console.log("Ocorreu um Erro!", error);
      }
    )
  }

}
