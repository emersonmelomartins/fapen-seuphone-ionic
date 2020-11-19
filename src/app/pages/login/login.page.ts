import { ActivatedRoute, ParamMap } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoadingController, NavController, ToastController } from "@ionic/angular";
import { UserAuthLogin } from "src/app/models/User";
import { AuthService } from "src/app/services/auth.service";
import { StorageService } from "src/app/services/storage.service";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  public formGroup: FormGroup;

  public isLoggedIn: boolean;

  public user: UserAuthLogin = {
    username: "",
    password: "",
  };

  public resultado: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private authService: AuthService,
    private nav: NavController,
    private storage: StorageService,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      if (param.get("cadastro") === "sucesso") {
        this.resultado = true;
        this.successToast("Usuário Criado com Sucesso !");
      }
    });
    this.formGroup = formBuilder.group({
      username: [
        this.user.username,
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
      password: [
        this.user.password,
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
    });
  }

  ngOnInit() {
    this.isLoggedIn = this.storage.getLocalUser() !== null ? true : false;

    if (this.isLoggedIn) {
      this.nav.navigateRoot("home");
    }
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

  doLogin() {
    this.showLoading("login");
    this.authService.authenticate(this.user).subscribe(
      (data) => {
        this.dismissLoader("login");
        this.authService.successfulLogin(data.body.jwtToken);
        this.nav.navigateForward("home");
        location.reload();
        this.successToast("Login efetuado com sucesso!");
      },
      (error) => {
        this.dismissLoader("login");
        this.errorToast("Ocorreu um erro!");
      }
    );
  }
}
