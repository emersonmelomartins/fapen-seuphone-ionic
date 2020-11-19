import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeasingInfoPage } from './leasing-info.page';

const routes: Routes = [
  {
    path: '',
    component: LeasingInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeasingInfoPageRoutingModule {}
