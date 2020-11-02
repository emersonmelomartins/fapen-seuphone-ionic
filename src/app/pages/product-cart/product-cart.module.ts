import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductCartPageRoutingModule } from './product-cart-routing.module';

import { ProductCartPage } from './product-cart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductCartPageRoutingModule
  ],
  declarations: [ProductCartPage]
})
export class ProductCartPageModule {}
