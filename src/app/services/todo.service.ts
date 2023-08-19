import { Injectable, signal } from '@angular/core';
import { Status, Todo } from '../model/Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todoList = signal<Todo[]>([])

  constructor() { }

  getFromCache() {
    const stringData = localStorage.getItem("TodoList")
    if (!stringData) return

    this.todoList.set(JSON.parse(stringData))

  }

  addTodo(item: Todo) {
    if (!item.title) throw new Error("Title is required")
    this.todoList.update((values) => [...values, item])
  }

  removeTodo(id: string) {
    this.todoList.update(values => {
      return values.filter(t => t.id !== id)
    })
  }

  updateTodo(item: Todo) {
    if (!item?.title) throw new Error("Title is required")
    this.todoList.mutate(values => {
      const index = values.findIndex(t => t.id === item.id)
      values[index] = item
    })
  }

  updateStatus(value: { id: string, status: Status }) {
    this.todoList.mutate(todos => {
      const index = todos.findIndex((t => t.id === value.id))

      todos[index].state = value.status
    })
  }

  saveToCache() {
    localStorage.setItem("TodoList", JSON.stringify(this.todoList()))
  }

  getListTodos() {
    return this.todoList
  }
}
