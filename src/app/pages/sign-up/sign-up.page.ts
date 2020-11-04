import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  public formGroup: FormGroup;

  public user = {
    email: "",
    name: "",
    dateNasc: "",
    sexo: "",
    cpf: "",
    login: "",
    password: "",
    confirmPassword: "",
  }

  public endereco = {
    cep: "" ,
    logradouro: "" ,
    number: "" ,
    neighborhood: "" ,
    city: "" ,
    uf: "",
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
        this.user.password,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
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
        this.user.name,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
        ]),
      ],
      dateNasc: [
        this.user.dateNasc,
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
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
          Validators.minLength(14),
        ]),
      ],
      cep: [
        this.endereco.cep,
        Validators.compose([
          Validators.required,
          Validators.minLength(9),
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

//   checkPasswords(group: FormGroup) {
//   let pass = group.get('password').value;
//   let confirmPass = group.get('confirmPass').value;

//   return pass === confirmPass ? null : { notSame: true }     
// }

  handleCadastrar() {
    console.log(this.formGroup.value);
  }

}
