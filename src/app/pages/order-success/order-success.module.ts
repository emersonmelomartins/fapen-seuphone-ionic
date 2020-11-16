import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderSuccessPageRoutingModule } from './order-success-routing.module';

import { OrderSuccessPage } from './order-success.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderSuccessPageRoutingModule,
    ComponentsModule
  ],
  declarations: [OrderSuccessPage]
})
export class OrderSuccessPageModule {}
