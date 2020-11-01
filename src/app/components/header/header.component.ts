import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  
  public isSearchBarHidden = true;


  constructor(private storage: StorageService) {}

  ngOnInit() {
    console.log(this.storage.getLocalUser());
  }

  handleSearchBar() {
    this.isSearchBarHidden = !this.isSearchBarHidden;
  } 
}
