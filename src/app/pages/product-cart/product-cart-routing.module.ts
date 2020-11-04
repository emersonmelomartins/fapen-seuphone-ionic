import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductCartPage } from './product-cart.page';

const routes: Routes = [
  {
    path: '',
    component: ProductCartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductCartPageRoutingModule {}
