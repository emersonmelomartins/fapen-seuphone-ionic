import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpPageRoutingModule } from './sign-up-routing.module';

import { SignUpPage } from './sign-up.page';
import { BrMaskerModule } from 'br-mask';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SignUpPageRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    BrMaskerModule
  ],
  declarations: [SignUpPage]
})
export class SignUpPageModule {}
