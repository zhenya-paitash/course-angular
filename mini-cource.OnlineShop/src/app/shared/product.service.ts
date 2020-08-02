import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";

import { firebaseResponse, Product } from "./interfaces";
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  type: string = 'phone';
  cartProducts: Product[] = [];

  constructor(private http: HttpClient) {}

  create(product: Product): Observable<any> {
    return this.http
      .post(`${environment.fbDbURL}/product.json`, product)
      .pipe(tap((res: firebaseResponse) => {
        return {
          ...product,
          id: res.name,
          date: new Date(product.date)
        }
      }))
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.fbDbURL}/product.json`)
      .pipe(
        map((res: Product[]) => Object.keys(res)
          .map(key => ({
            ...res[key],
            id: key,
            date: new Date(res[key].date)
          }) ))
      )
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.fbDbURL}/product/${id}.json`)
      .pipe(
        map((res: Product) => {
          return {
            ...res,
            id,
            date: new Date(res.date) }
        })
      )
  }

  remove(id: string): Observable<void> {
    return this.http
      .delete<void>(`${environment.fbDbURL}/product/${id}.json`)
  }

  update(product: Product): Observable<Product> {
    return this.http
      .patch<Product>(`${environment.fbDbURL}/product/${product.id}.json`, product)
  }

  setType(type: string) {
    this.type = type;
  }

  addProduct(product: Product) {
    this.cartProducts.push(product)
  }

}
