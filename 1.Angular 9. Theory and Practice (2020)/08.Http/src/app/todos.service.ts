import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, delay, map, tap} from "rxjs/operators";
import {log} from "util";

export interface Todo {
  completed: boolean;
  title: string;
  id?: number;
}

@Injectable({providedIn: 'root'})
export class TodosService {
  constructor(private http: HttpClient) {
  }

  addTodo(todo: Todo): Observable<Todo> {
    const headers = new HttpHeaders({
      JWToken: Math.random().toString(),
      myCustomHeader: 'hello world'
    });

    return this.http.post<Todo>(
      `https://jsonplaceholder.typicode.com/todos`,
      todo,
      {headers});
  }

  fetchTodos(): Observable<Todo[]> {
    // const params = new HttpParams().set('_limit', '3');
    let params = new HttpParams();
    params = params.append('_limit', '4');
    params = params.append('custom', 'chel');

    return this.http.get<Todo[]>(
      // 'https://jsonplaceholder.typicode.com/todos?_limit=2',
      'https://jsonplaceholder.typicode.com/todos',
      {params, observe: "response"})
      .pipe(
        map(res => res.body),
        delay(500),
        catchError(err => {
          console.log('====');
          return throwError(err);
        }));
  }

  // deleteTodo(id: number): Observable<void> {
  deleteTodo(id: number): Observable<any> {
    return this.http.delete<void>(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {observe: "events"})
      .pipe(tap(event => {
        // console.log(event);
        if (event.type === HttpEventType.Sent) {
          console.log('Sent', event);
        }

        if (event.type === HttpEventType.Response) {
          console.log('Response', event);
        }
      }));
  }

  completeTodo(id: number): Observable<Todo> {
    return this.http.put<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      completed: true
    });
  }
}
