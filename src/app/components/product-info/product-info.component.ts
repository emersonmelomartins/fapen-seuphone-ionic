import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
  template: `
    <p>Testando {{title}}</p>
  `
})
export class ProductInfoComponent implements OnInit {

  @Input() title: string;

  constructor() {
   }

  ngOnInit() {

  }

}
