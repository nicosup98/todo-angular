export interface Todo {
  id: string;
  title: string;
  description?: string;
  state: Status;
}

export type Status = "todo" | "doing" | "done";

