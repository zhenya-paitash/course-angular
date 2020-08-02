import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

import { ProductService } from "../../shared/product.service";
import { Product } from "../../shared/interfaces";


@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  productSub: Subscription;
  removedSub: Subscription;
  productName: string;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productSub = this.productService.getAll()
      .subscribe(products => {
        this.products = products
      })
  }

  ngOnDestroy(): void {
    if (this.productSub) {this.productSub.unsubscribe()}
    if (this.removedSub) {this.removedSub.unsubscribe()}
  }

  remove(id: string) {
    this.removedSub = this.productService.remove(id)
      .subscribe(() => {
        this.products = this.products.filter(product => product.id != id)
      })
  }
}
