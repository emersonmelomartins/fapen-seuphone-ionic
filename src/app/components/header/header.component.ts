import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isHidden = true;

  constructor() {
   }

  ngOnInit() {}

  handleSearchBar() {
    if(this.isHidden === true ) {
      this.isHidden = false;
    } else {
      this.isHidden = true;
    }
  } 
}
