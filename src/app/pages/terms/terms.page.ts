import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {

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

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      radioOption: [
        this.selectedOption,
        Validators.compose([Validators.requiredTrue]),
      ],
    });

  }

  ngOnInit() {
  }

  radioChange(event) {
    this.selectedOption = event.target.value;
  }

}
