import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ProductSlideComponent } from './product-slide/product-slide.component';

@NgModule({
  declarations: [HeaderComponent, ProductSlideComponent, ProductInfoComponent],
  exports: [HeaderComponent, ProductSlideComponent, ProductInfoComponent]
})

export class ComponentsModule {}