import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    LoginPageRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
