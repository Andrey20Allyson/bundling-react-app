import React from "react";
import { Button } from "../components/Button";
import Title from "../components/Title";
import TodoList from "../components/TodoList";
import useThemedClass from "../utils/useThemedClass";

export default function Home() {
  return (
    <div className={useThemedClass("root-div")}>
      <div className={useThemedClass("main-div")}>
        <Title>Afazeres</Title>
        <TodoList />
        <Button className="add-todo" title="+" />
      </div>
    </div>
  )
}