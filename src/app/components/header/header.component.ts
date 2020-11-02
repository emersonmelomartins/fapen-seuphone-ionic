import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  
  //public isSearchBarHidden = true;

  //public inputValue: string = "";


  constructor(private storage: StorageService, private nav: NavController) {}

  ngOnInit() {
    
  }

  handleSearchBar() {
    //this.isSearchBarHidden = !this.isSearchBarHidden;
    this.nav.navigateRoot("products");
  }

  /*
  searchProducts(event) {
    this.inputValue = event.target.value;
  }
  */
}
