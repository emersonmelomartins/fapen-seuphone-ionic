import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserOrdersPageRoutingModule } from './user-orders-routing.module';

import { UserOrdersPage } from './user-orders.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserOrdersPageRoutingModule,
    ComponentsModule
  ],
  declarations: [UserOrdersPage]
})
export class UserOrdersPageModule {}
