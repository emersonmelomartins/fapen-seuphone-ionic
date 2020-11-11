import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserInfoPageRoutingModule } from './user-info-routing.module';

import { UserInfoPage } from './user-info.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UserInfoPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [UserInfoPage]
})
export class UserInfoPageModule {}
