import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  LoadingController,
  NavController,
  ToastController,
} from "@ionic/angular";
import { Endereco, User } from "src/app/models/User";
import { AddressService } from "src/app/services/address.service";
import { AuthService } from "src/app/services/auth.service";
import { StorageService } from "src/app/services/storage.service";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.page.html",
  styleUrls: ["./user-info.page.scss"],
})
export class UserInfoPage implements OnInit {
  userInfo: any;
  userAvatar: string;
  uploadImageBase64: string | ArrayBuffer;

  postUserData: any = {
    userLogin: "",
    base64Image: "",
  };

  public formGroup: FormGroup;

  public options = [
    {
      icon: "log-in-outline",
      value: 1,
    },
    {
      icon: "person-outline",
      value: 2,
    },
    {
      icon: "home-outline",
      value: 3,
    },
  ];

  public selectedOption: number = 1;

  public address: Endereco = {
    idEndereco: 0,
    uf: "",
    cidade: "",
    logradouro: "",
    bairro: "",
    cep: "",
    complemento: "",
    numero: 0,
  };

  constructor(
    public authService: AuthService,
    public storage: StorageService,
    public usersService: UsersService,
    private formBuilder: FormBuilder,
    private nav: NavController,
    private toastController: ToastController,
    private addressService: AddressService,
    private loadingController: LoadingController
  ) {
    this.formGroup = formBuilder.group({
      radioOption: [
        this.selectedOption,
        Validators.compose([Validators.required]),
      ],
    });
  }

  ionViewWillEnter() {
    if (this.storage.getLocalUser() === null) {
      this.nav.navigateRoot("login");
    }
  }

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.login) {
      this.postUserData.userLogin = localUser.login;
      this.authService.findByLogin(localUser.login).subscribe((resp) => {
        this.userInfo = resp;
        this.userAvatar = resp.caminhoFoto;
        this.address = resp.pessoa.endereco;
      });
    }
  }

  async showLoading(loadingId: string, loadingMessage: string = "Aguarde...") {
    const loading = await this.loadingController.create({
      id: loadingId,
      message: loadingMessage,
      spinner: "circles",
      duration: 4000,
    });
    return await loading.present();
  }

  async dismissLoader(loadingId: string) {
    return await this.loadingController
      .dismiss(null, null, loadingId)
      .then(() => console.log("loading dismissed"));
  }

  async errorToast(message) {
    const toast = await this.toastController.create({
      color: "danger",
      header: "ERRO!",
      message: message,
      position: "top",
      duration: 3000,
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

  loadAvatar(event) {
    var filename = event.target.files[0];

    var fileReader = new FileReader();

    fileReader.readAsDataURL(filename);
    fileReader.onload = () => {
      //this.uploadImageBase64 = fileReader.result;
      this.postUserData.base64Image = fileReader.result;
    };
  }

  updateAvatar() {
    this.usersService.updateAvatar(this.postUserData).subscribe((resp) => {
      location.reload();
    });
  }

  radioChange(event) {
    this.selectedOption = event.target.value;
  }

  getAddressByZipcode() {
    this.showLoading("viacep");
    this.addressService.getAddressByZipcode(this.address.cep).subscribe(
      (resp) => {
        this.dismissLoader("viacep");

        this.address.bairro = resp.bairro;
        this.address.logradouro = resp.logradouro;
        this.address.cidade = resp.localidade;
        this.address.uf = resp.uf;
      },
      (error) => {
        this.dismissLoader("viacep");
        this.errorToast("Não foi encontrado o cep informado.");
      }
    );
  }

  updateAddress() {
    this.showLoading("update-address");
    this.userInfo.pessoa.endereco = this.address;
    this.userInfo.pessoa.endereco.cep = this.userInfo.pessoa.endereco.cep.replace( /\D/g , "");
    this.usersService.updateAddress(this.userInfo).subscribe((resp) => {
      this.dismissLoader("update-address");
      this.successToast("Seu endereço foi atualizado com sucesso!");
    },
    (error) => {
      this.dismissLoader("update-address");
      this.errorToast("Ocorreu um erro!");
    });
  }
}
