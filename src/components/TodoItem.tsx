import React, { useState } from "react";
import useThemedClass from "../utils/useThemedClass";
import ConfigButton from "./ConfigButton";

export interface TodoItemProps {
  title?: string;
  expiresDate?: number;
  creationDate?: number;
}

export default function TodoItem(props: TodoItemProps) {
  const [checked, setChecked] = useState(false);

  const checkboxText = checked ? '\u2713' : undefined;

  return (
    <div className={useThemedClass("todo-item")}>
      <p className={useThemedClass("title")} >{props.title ?? 'N/A'}</p>
      <div className="row">
        <div
          className={useThemedClass("todo-checkbox")}
          onClick={() => setChecked(!checked)}>
          {checkboxText}
        </div>
        <ConfigButton/>
      </div>
    </div>
  )
}