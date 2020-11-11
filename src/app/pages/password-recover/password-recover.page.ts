import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-recover',
  templateUrl: './password-recover.page.html',
  styleUrls: ['./password-recover.page.scss'],
})
export class PasswordRecoverPage implements OnInit {
  public formGroup: FormGroup;

  public user = {
    email: "",
  }


  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      email: [
        this.user.email,
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
    })
   }

  ngOnInit() {
  }

  recoverPassword() {
    console.log(this.user);
  }

}
