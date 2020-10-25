import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { ProductSlideComponent } from './product-slide/product-slide.component';

@NgModule({
  declarations: [HeaderComponent, ProductSlideComponent],
  exports: [HeaderComponent, ProductSlideComponent]
})

export class ComponentsModule {}