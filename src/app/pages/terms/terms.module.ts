import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermsPageRoutingModule } from './terms-routing.module';

import { TermsPage } from './terms.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TermsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TermsPage]
})
export class TermsPageModule {}
