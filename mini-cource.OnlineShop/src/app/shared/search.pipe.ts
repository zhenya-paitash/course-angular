import {Pipe, PipeTransform} from '@angular/core';

import { Product } from "./interfaces";


@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: Product[], productName=''): Product[] {
    if (!productName.trim()) return products;

    return products.filter(i =>
      i.title.toLowerCase().includes(productName.toLowerCase())
    )
  }

}
