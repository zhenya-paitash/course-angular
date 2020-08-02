import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

import { OrderService } from "../../shared/order.service";
import { userOrder } from "../../shared/interfaces";


@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit, OnDestroy {

  orders: userOrder[] = [];
  orderSub: Subscription;
  rmvedSub: Subscription;
  constructor(
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.orderSub = this.orderService.getAll()
      .subscribe(orders => this.orders = orders)
  }

  ngOnDestroy(): void {
    if (this.orderSub) this.orderSub.unsubscribe();
    if (this.rmvedSub) this.rmvedSub.unsubscribe();
  }

  rmved(id: string) {
    this.rmvedSub = this.orderService.remove(id)
      .subscribe(() => {
        this.orders = this.orders.filter(order => order.id != id)
      })
  }

}
