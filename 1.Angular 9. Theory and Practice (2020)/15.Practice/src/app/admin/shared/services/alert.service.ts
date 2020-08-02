import {Injectable} from "@angular/core";
import {Subject} from "rxjs";


export type AlertType = 'success' | 'warning' | 'danger';

export interface Alert {
  text: string
  type: AlertType
}

@Injectable()
export class AlertService {
  public alert$ = new Subject<Alert>();

  success (text: string) {this.alert$.next({text, type: 'success' })}
  warning (text: string) {this.alert$.next({text, type: 'warning' })}
  danger  (text: string) {this.alert$.next({text, type: 'danger'  })}
}
