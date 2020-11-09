import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NavController } from "@ionic/angular";
import { UserAuthLogin } from "src/app/models/User";
import { AuthService } from "src/app/services/auth.service";
import { StorageService } from 'src/app/services/storage.service';
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

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private authService: AuthService,
    private nav: NavController,
    private storage: StorageService
  ) {
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

    if(this.isLoggedIn) {
      this.nav.navigateRoot('home');
    }
  }

  doLogin() {
    this.authService.authenticate(this.user).subscribe(
      (data) => {
        this.authService.successfulLogin(data.body.jwtToken);
        this.nav.navigateForward("home");
        alert("Login efetuado com sucesso!");
        location.reload();
      },
      (error) => {
        alert("Ocorreu um Erro!");
      }
    );
  }
}
