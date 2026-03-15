import type { TodoItem } from "~/types";

export interface TodoItemRowProps {
  item: TodoItem;
}

export interface TodoItemRowEmits {
  update: [item: TodoItem];
  delete: [];
}
