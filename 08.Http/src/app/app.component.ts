import {Component, OnInit} from '@angular/core';
import {Todo, TodosService} from "./todos.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];
  todoTitle = '';
  loading = false;
  errors = '';

  constructor(private todosService: TodosService) {
  }

  ngOnInit() {
    this.fetchTodos();
  }

  addTodo() {
    if (!this.todoTitle.trim()) {
      return null;
    }

    this.todosService
      .addTodo({
        completed: false,
        title: this.todoTitle,
        id: this.todos.length + 1
      })
      .subscribe(todo => {
        console.log(todo);
        this.todos.push(todo);
        this.todoTitle = '';
      });
  }

  fetchTodos() {
    this.loading = true;
    this.todosService
      .fetchTodos()
      .subscribe(td => {
        this.todos = td;
        this.loading = false;
      }, error => {
        console.log(error.message);
        this.errors = error.message;
      });
  }

  deleteTodo(id: number) {
    this.todosService
      .deleteTodo(id)
      .subscribe(res => {
        this.todos = this.todos.filter(i => i.id !== id);
      });
  }

  completedTodo(id: number) {
    this.todosService
      .completeTodo(id)
      .subscribe(res => {
        this.todos.find(todo => todo.id === id).completed = true;
      });
  }
}
