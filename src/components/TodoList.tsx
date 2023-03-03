import React, { useEffect, useRef, useState } from "react";
import TodoItem from "./TodoItem";

export interface TodoListProps {
  onItemSelected: (index: number) => void;
}

export default function TodoList(props: any) {
  const [state, setState] = useState(() => {
    const itens = [];

    for (let i = 0; i < 10; i++) {
      itens.push(<TodoItem />);
    }

    return {
      itens,
      scroll: 0,
      pressing: false,
    };
  });

  let scroll = state.scroll;
  let scrollableRef: React.RefObject<HTMLDivElement> = {
    current: null,
  };

  function mouseMoveHandler(ev: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const div = scrollableRef.current;
    const parent = div?.parentElement;

    if (div && parent) {
      const newScroll = scroll + ev.movementY;
      const minScroll = -div.clientHeight + parent.clientHeight;
      const maxScroll = 0;

      const canScrollDown = newScroll > minScroll
      const canScrollUp = newScroll < maxScroll;

      if (canScrollUp) {
        if (canScrollDown) {
          scroll = newScroll;
        } else {
          scroll = minScroll;
        }
      } else {
        scroll = maxScroll;
      }

      div.style.top = `${scroll}px`;
    }
  }

  return (
    <div className="todo-list"
      onMouseMove={state.pressing ? mouseMoveHandler : undefined}
      onMouseDown={() => setState({ ...state, pressing: true, scroll })}
      onMouseUp={() => setState({ ...state, pressing: false, scroll })}>
      <div ref={scrollableRef}>
        {state.itens}
      </div>
    </div>
  )
}