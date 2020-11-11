import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasswordRecoverPageRoutingModule } from './password-recover-routing.module';

import { PasswordRecoverPage } from './password-recover.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PasswordRecoverPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PasswordRecoverPage]
})
export class PasswordRecoverPageModule {}
