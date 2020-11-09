import { Component, OnInit } from "@angular/core";
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.page.html",
  styleUrls: ["./user-info.page.scss"],
})
export class UserInfoPage implements OnInit {
  uploadImageBase64: string | ArrayBuffer;

  constructor(public authService: AuthService, public storage: StorageService) {}

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.login) {
      this.authService.findByLogin(localUser.login).subscribe(resp => {
        console.log(resp);
      })
    }
  }

  carregaImagem(event) {
    var filename = event.target.files[0];

    var fileReader = new FileReader();

    fileReader.readAsDataURL(filename);
    fileReader.onload = () => {
      this.uploadImageBase64 = fileReader.result;
    };
  }
}
