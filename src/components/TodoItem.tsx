import React from "react";

export interface TodoItemProps {
  title?: string;
  expiresDate?: number;
  creationDate?: number;
}

export default function TodoItem(props: TodoItemProps) {
  return (
    <div className="todo-item">
      <p className="title" >{props.title ?? 'N/A'}</p>
    </div>
  )
}