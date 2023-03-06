import React from "react";
import { Button } from "../components/Button";
import Header from "../components/Header";
import Title from "../components/Title";
import TodoList from "../components/TodoList";
import { useAppDispatch } from "../storage/redux-hooks";
import useThemedClass from "../utils/useThemedClass";

export default function Home() {
  const dispatch = useAppDispatch();

  return (
    <div className={useThemedClass("root-div")}>
      <Header />
      <div className={useThemedClass("main-div")}>
        <Title>Afazeres</Title>
        <TodoList />
        <Button className="add-todo" title="+" />
      </div>
    </div>
  )
}