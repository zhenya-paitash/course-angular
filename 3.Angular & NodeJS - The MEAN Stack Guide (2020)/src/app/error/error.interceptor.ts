import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';

import {ErrorComponent} from './error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler)
    : Observable<HttpEvent<unknown>> {
    return next
      .handle(req)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          let message = 'An unknown Error occurred!';
          if (err.error.message) message = err.error.message;

          this.dialog.open(ErrorComponent, {
            data: { message }
          });
          return throwError(err);
        })
      );
  }
}
