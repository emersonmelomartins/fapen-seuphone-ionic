import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage {

  public formGroup: FormGroup;

  public options = [
    {
      label: 'Aceitar',
      value: true
    },
    {
      label: 'Recusar',
      value: false
    }
  ];

  public selectedOption: boolean = false;

  constructor(private formBuilder: FormBuilder, private nav: NavController, private storage: StorageService) {
    this.formGroup = formBuilder.group({
      radioOption: [
        this.selectedOption,
        Validators.compose([Validators.requiredTrue]),
      ],
    });

  }

  ionViewWillEnter() {
    if(this.storage.getLocalUser() === null) {
      this.nav.navigateRoot("login");
    }
   }

  radioChange(event) {
    this.selectedOption = event.target.value;
  }

}
