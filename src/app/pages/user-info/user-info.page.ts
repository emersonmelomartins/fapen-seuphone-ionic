import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.page.html",
  styleUrls: ["./user-info.page.scss"],
})
export class UserInfoPage implements OnInit {
  userInfo: any;
  uploadImageBase64: string | ArrayBuffer;

  postUserData: any = {
    userLogin: "",
    base64Image: ""
  };

  public formGroup: FormGroup;

  public options = [
    {
      label: 'Login',
      value: 1
    },
    {
      label: 'Pessoa',
      value: 2
    },
    {
      label: 'Endereço',
      value: 3
    }
  ];

  public selectedOption: number = 1;


  constructor(public authService: AuthService, public storage: StorageService, public usersService: UsersService, private formBuilder: FormBuilder, private nav: NavController) {

    this.formGroup = formBuilder.group({
      radioOption: [
        this.selectedOption,
        Validators.compose([Validators.required]),
      ],
    });
  }

  ionViewWillEnter() {
    if(this.storage.getLocalUser() === null) {
      this.nav.navigateRoot("login");
    }
   }

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.login) {
      this.postUserData.userLogin = localUser.login;
        this.authService.findByLogin(localUser.login).subscribe(resp => {
          this.userInfo = resp;
        });
    }
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
    this.usersService.updateAvatar(this.postUserData).subscribe(resp => {
      location.reload();
    })
  }

  radioChange(event) {
    this.selectedOption = event.target.value;
  }
}
