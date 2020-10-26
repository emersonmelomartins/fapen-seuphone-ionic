import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public formGroup: FormGroup;

  public user = {
    login: "",
    password: "",
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
    });

   }

  ngOnInit() {
  }

  handleLogin() {
    console.log(this.formGroup.value);
  }

}
