import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: any;

  constructor(private navCtrl: NavController) {
    console.log(this.title);
   }

  ngOnInit() {}

  public showTitle() { console.log(this.title); } 
}
