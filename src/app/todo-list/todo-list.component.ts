import { Component, OnInit, inject, signal } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo, Status } from '../model/Todo';
import { nanoid } from 'nanoid';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  private todo_list_service = inject(TodoService)
  todo_list = this.todo_list_service.getListTodos()
  canAddTodo = signal<boolean>(false)
  newTodo = signal<Todo>({ title: "", description: "", id: nanoid(), state: "todo" })

  ngOnInit() {
    this.todo_list_service.getFromCache()
  }

  handleAddTodo(e: any) {
    const value = e.target.value
    this.newTodo.mutate(nt => {
      nt.title = value
    })
  }
  handleAddTodoDescription(e: any) {
    const value = e.target.value
    this.newTodo.mutate(nt => {
      nt.description = value
    })
  }
  addTodo() {
    this.canAddTodo.set(true)
  }

  insertTodo() {
    this.todo_list_service.addTodo(this.newTodo())
    this.canAddTodo.set(false)
    this.newTodo.set({ title: "", description: "", id: nanoid(), state: "todo" })
  }

  saveToCache() {
    this.todo_list_service.saveToCache()
    alert("Saved in browser")
  }
  updateStatus(value: { id: string, status: Status }) {
    this.todo_list_service.updateStatus(value)
  }

  cancelAddTodo() {
    this.canAddTodo.set(false)
    this.resetNewTodo()
  }

  resetNewTodo() {
    this.newTodo.set({ title: "", description: "", id: nanoid(), state: "todo" })
  }


  deleteTodoById(id: string) {
    this.todo_list_service.removeTodo(id)
  }







}
