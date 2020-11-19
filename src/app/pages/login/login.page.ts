import { ActivatedRoute, ParamMap } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NavController, ToastController } from "@ionic/angular";
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
    private toastController: ToastController
  ) {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      if (param.get("cadastro") === "sucesso") {
        this.resultado = true;
        this.successToast();
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

  async successToast() {
    const toast = await this.toastController.create({
      color: "success",
      header: "Sucesso !",
      message: "Usuário Criado com Sucesso!",
      position: "top",
      duration: 4000
    });
    toast.present();
  }

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

  doLogin() {
    this.authService.authenticate(this.user).subscribe(
      (data) => {
        this.authService.successfulLogin(data.body.jwtToken);
        this.nav.navigateForward("home");
        location.reload();
      },
      (error) => {
        this.errorToast();
      }
    );
  }
}
