import React, { useMemo, useState } from "react";
import { scrollElementOnY } from "../utils/elementScroll";
import useThemedClass from "../utils/useThemedClass";
import TodoItem from "./TodoItem";

export interface Todo {
  title: string;
  done: boolean;
  creation: number;
  expires?: number;
}

export interface TodoListProps {
  itens?: Todo[];
  onItemSelected?: (index: number) => void;
}

export default function TodoList(props: TodoListProps) {
  const [pressing, setPressing] = useState(false);
  const itens = useMemo(() => {
    const itens = [];

    for (let i = 0; i < 50; i++) {
      itens.push(<TodoItem title={`Item Nº ${i + 1}`} key={i} />);
    }

    return itens;
  }, []);
  const scroll = useMemo(() => {
    return {
      current: 0,
      velocity: 0,
      timing: 0,
    };
  }, []);

  let scrollableRef: React.RefObject<HTMLDivElement> = {
    current: null,
  };

  function mouseMoveHandler(ev: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const element = scrollableRef.current;
    const parent = element?.parentElement;

    if (!element || !parent) return;

    scrollElementOnY({
      element,
      parent,
      pixels: ev.movementY,
      scrollRef: scroll,
    });

    scroll.velocity = ev.movementY * 2;
    scroll.timing = Date.now();
  }

  function runScrollVelocity() {
    const element = scrollableRef.current;
    const parent = element?.parentElement;

    if (!element || !parent) return;
    if (scroll.velocity > 0.1 || scroll.velocity < -0.1) requestAnimationFrame(runScrollVelocity);

    scrollElementOnY({
      scrollRef: scroll,
      element,
      parent,
      pixels: scroll.velocity,
    });

    scroll.velocity = scroll.velocity * .8;
  }

  if (!pressing && Date.now() - scroll.timing < 20) setTimeout(runScrollVelocity);

  window.onscroll = () => false;

  return (
    <div
      className={useThemedClass("todo-list")}
      onMouseDown={() => setPressing(true)}
      onMouseUp={() => setPressing(false)}
      onMouseLeave={() => setPressing(false)}
      onMouseMove={pressing ? mouseMoveHandler : undefined}>
      <div ref={scrollableRef}>
        {itens}
      </div>
    </div>
  )
}