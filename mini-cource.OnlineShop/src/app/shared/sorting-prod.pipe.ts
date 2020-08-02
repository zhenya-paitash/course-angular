import {Pipe, PipeTransform} from '@angular/core';

import { Product } from "./interfaces";


@Pipe({
  name: 'sortingProd'
})
export class SortingProdPipe implements PipeTransform {

  transform(products: Product[], type=''): Product[] {
    return products.filter(product => product.type == type)
  }

}
