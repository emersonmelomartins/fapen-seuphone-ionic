import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-slide',
  templateUrl: './product-slide.component.html',
  styleUrls: ['./product-slide.component.scss'],
  template: `
      <ion-slides pager="true" [options]="slideOpts">
        <ion-slide>
          <img src="../../../assets/iphone_1.png" />
        </ion-slide>
        <ion-slide>
          <img src="../../../assets/iphone_2.png" />
        </ion-slide>
        <ion-slide>
          <img src="../../../assets/iphone_3.png" />
        </ion-slide>
        <ion-slide>
          <img src="../../../assets/iphone_1.png" />
        </ion-slide>
        <ion-slide>
          <img src="../../../assets/iphone_2.png" />
        </ion-slide>
        <ion-slide>
          <img src="../../../assets/iphone_3.png" />
        </ion-slide>
      </ion-slides>
  `
})
export class ProductSlideComponent implements OnInit {

  slideOpts = {
    initialSlide: 1,
    slidesPerView: 3,
    speed: 400
  };

  constructor() { }

  ngOnInit() {}

}
