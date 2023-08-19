import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo, Status } from "../model/Todo"
@Component({
  selector: 'Todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  @Input() item!: Todo;
  @Output() changeStatus = new EventEmitter<{ id: string, status: Status }>();
  @Output() deleteTodo = new EventEmitter<string>();


  constructor() { }


  updateStatus() {
    const status: Status[] = ["todo", "doing", "done"]

    const index = status.findIndex(s => s === this.item.state)
    const newStatus = status[(index + 1) % 3]
    this.changeStatus.emit({ id: this.item.id, status: newStatus })
  }

  eraseTodo() {
    this.deleteTodo.emit(this.item.id)
  }
}
