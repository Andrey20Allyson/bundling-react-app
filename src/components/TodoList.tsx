import React, { useState } from "react";
import useThemedClass from "../utils/useThemedClass";
import TodoItem from "./TodoItem";

export interface TodoListProps {
  onItemSelected: (index: number) => void;
}

export interface ScrollRef {
  current: number;
}

export interface ScrollElementOptions {
  parent?: HTMLElement;
  element: HTMLElement;
  scrollRef: ScrollRef;
  pixels: number;
}

export function scrollElementOnY(options: ScrollElementOptions) {
  const { element, pixels, scrollRef, parent = element.parentElement } = options;
  let scroll = scrollRef.current;

  if (!parent) return;

  const newScroll = scroll + pixels;
  const minScroll = -element.clientHeight + parent.clientHeight;
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

  element.style.top = `${scroll}px`;

  scrollRef.current = scroll;
}

export default function TodoList(props: any) {
  const [state, setState] = useState(() => {
    const itens = [];

    for (let i = 0; i < 50; i++) {
      itens.push(<TodoItem title={`Item Nº ${i + 1}`} key={i} />);
    }

    return {
      itens,
      scroll: 0,
      scrollVelocity: 0,
      scrollTiming: 0,
      pressing: false,
    };
  });

  let { scrollVelocity, scrollTiming } = state;

  let scrollRef: ScrollRef = {
    current: state.scroll,
  };

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
      scrollRef,
    });

    scrollVelocity = ev.movementY * 2;
    scrollTiming = Date.now();
  }

  function runScrollVelocity() {
    const element = scrollableRef.current;
    const parent = element?.parentElement;

    if (!element || !parent) return;
    if (scrollVelocity > 0.1 || scrollVelocity < -0.1) requestAnimationFrame(runScrollVelocity);

    scrollElementOnY({
      scrollRef,
      element,
      parent,
      pixels: scrollVelocity * 2,
    });

    scrollVelocity = scrollVelocity * .8;
  }

  if (!state.pressing && Date.now() - state.scrollTiming < 20) setTimeout(runScrollVelocity);

  return (
    <div className={useThemedClass("todo-list")}
      onMouseMove={state.pressing ? mouseMoveHandler : undefined}
      onMouseDown={() => setState({ ...state, pressing: true, scroll: scrollRef.current, scrollVelocity, scrollTiming })}
      onMouseUp={() => setState({ ...state, pressing: false, scroll: scrollRef.current, scrollVelocity, scrollTiming })}>
      <div ref={scrollableRef}>
        {state.itens}
      </div>
    </div>
  )
}