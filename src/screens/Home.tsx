import React from "react";
import { Button } from "../components/Button";
import Title from "../components/Title";
import TodoList from "../components/TodoList";

export default function Home() {
  return (
    <div className="main-div">
      <Title>Lista de TODO</Title>
      <TodoList/>
      <Button className="add-todo" title="+" />
    </div>
  )
}