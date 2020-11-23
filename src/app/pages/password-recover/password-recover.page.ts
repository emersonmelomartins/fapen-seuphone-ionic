import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { UsersService } from 'src/app/services/users.service';

import {timeout} from 'rxjs/operators';

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


  constructor(private formBuilder: FormBuilder, private usersService: UsersService, public toastController: ToastController, public loadingController: LoadingController) {
    this.formGroup = this.formBuilder.group({
      email: [
        this.user.email,
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
    })
   }

  ngOnInit() {
  }

  async showLoading(loadingId: string, loadingMessage: string = 'Aguarde...') {
    const loading = await this.loadingController.create({
      id: loadingId,
      message: loadingMessage,
      spinner: 'circles',
      duration: 4000,
    });
    return await loading.present();
}

  async dismissLoader(loadingId: string) {
      return await this.loadingController.dismiss(null, null, loadingId).then(() => console.log('loading dismissed'));
  }

  async errorToast(message) {
    const toast = await this.toastController.create({
      color: 'danger',
      position: 'top',
      header: 'ERROR!',
      message: message,
      duration: 3000
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

  async recoverPassword() {
     await this.showLoading('recoverPassword');

    this.usersService.recoverPassword(this.user).subscribe(resp => {
        this.dismissLoader('recoverPassword');
        this.successToast(resp.message);
      },
      (error) => {
        this.dismissLoader('recoverPassword');
        this.errorToast(error.error.message);
      })
  }

}
