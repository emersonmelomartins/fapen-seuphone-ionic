import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeasingInfoPageRoutingModule } from './leasing-info-routing.module';

import { LeasingInfoPage } from './leasing-info.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeasingInfoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [LeasingInfoPage]
})
export class LeasingInfoPageModule {}
