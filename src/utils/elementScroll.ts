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