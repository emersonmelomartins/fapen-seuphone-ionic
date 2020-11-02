import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/Product';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(products: Product[], inputValue: string): Product[] {
    
    if (!inputValue) {
      return products;
    }

    const filter = products.filter((product) => {
      return product.descricao
        .toLocaleLowerCase()
        .includes(inputValue.toLocaleLowerCase());
    });

    return filter;
  }
}
