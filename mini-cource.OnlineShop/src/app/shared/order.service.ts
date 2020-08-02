import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";

import {firebaseResponse, Product, userOrder} from "./interfaces";
import { environment } from "../../environments/environment";


@Injectable({ providedIn: 'root' })
export class OrderService {

  constructor(private http: HttpClient) {}

  create(order: userOrder): Observable<any> {
    return this.http
      .post(`${environment.fbDbURL}/orders.json`, order)
      .pipe(tap((res: firebaseResponse) => {
        return {
          ...order,
          id: res.name,
          date: new Date(order.date)
        }
      }))
  }

  getAll(): Observable<userOrder[]> {
    return this.http.get<userOrder[]>(`${environment.fbDbURL}/orders.json`)
      .pipe(
        map((res: userOrder[]) => Object.keys(res)
          .map(key => ({
            ...res[key],
            id: key,
            date: new Date(res[key].date)
          }) ))
      )
  }


  remove(id: string): Observable<void> {
    return this.http
      .delete<void>(`${environment.fbDbURL}/orders/${id}.json`)
  }

}
