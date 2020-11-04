import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  public formGroup: FormGroup;
  
  public pessoa = {
    name: "",
    tel: "",
    cel: "",
  }

  public user = {
    login: "",
    password: "",
    confirmPassword: "",
    email: "",
    dateNasc: "",
    sexo: "",
    pessoa: this.pessoa,
    cpf: "",
  }

  public endereco = {
    cep: "" ,
    logradouro: "" ,
    number: "" ,
    neighborhood: "" ,
    city: "" ,
    uf: "",
    complement: "",
  }

  constructor(private formBuilder: FormBuilder) {
    
    this.formGroup = formBuilder.group({
      login: [
        this.user.login,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
        ]),
      ],
      password: [
        this.user.password,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
        ]),
      ],
      confirmPassword: [
        this.user.confirmPassword,
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
      name: [
        this.pessoa.name,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
        ]),
      ],
      dateNasc: [
        this.user.dateNasc,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
        ]),
      ],
      sexo: [
        this.user.sexo,
        Validators.compose([
          Validators.required,
        ]),
      ],
      cpf: [
        this.user.cpf,
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
        this.endereco.number,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
        ]),
      ],
      neighborhood: [
        this.endereco.neighborhood,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
        ]),
      ],
      city: [
        this.endereco.city,
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
      console.log(this.formGroup.get('password').value);
    }
    return null;
  }


  handleCadastrar() {
    console.log(this.formGroup.getRawValue());
  }

}
