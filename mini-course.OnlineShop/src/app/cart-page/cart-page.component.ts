import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { ProductService } from "../shared/product.service";
import { Product, userOrder } from "../shared/interfaces";
import { OrderService } from "../shared/order.service";


@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  cartProducts: Product[] = [];
  totalPrice: number = 0;
  form: FormGroup;
  submitted: boolean = false;
  added: string = '';
  constructor(
    private productService: ProductService,
    private orderService: OrderService
  ) {}


  ngOnInit(): void {
    this.cartProducts = this.productService.cartProducts;
    for (let product of this.cartProducts)
      this.totalPrice += +product.price;

    this.form = new FormGroup({
      name:    new FormControl(null,   Validators.required),
      phone:   new FormControl(null,   Validators.required),
      address: new FormControl(null,   Validators.required),
      payment: new FormControl('cash', Validators.required)
    })
  }

  submit() {
    if (this.form.invalid) return;

    this.submitted = true;
    const order: userOrder = {
      name:    this.form.value.name,
      phone:   this.form.value.phone,
      address: this.form.value.address,
      payment: this.form.value.payment,
      price:   this.totalPrice,
      orders:  this.cartProducts,
      date:    new Date()
    };

    this.orderService.create(order).subscribe(res => {
      this.form.reset();
      this.added = 'Delivery is framed';
      this.submitted = false;
    }, err => {
      // console.error(err);
      this.submitted = false;
    })
  }

  deleteProduct(product: Product) {
    this.totalPrice -= +product.price;
    this.cartProducts.splice(this.cartProducts.indexOf(product), 1)
  }
}
