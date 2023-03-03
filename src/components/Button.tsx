import React from "react";

interface ButtonProps {
  title?: string;
  onClick?: (ev: React.MouseEvent) => void; 
  className?: string;
}

export function Button(props: ButtonProps) {
  return (
    <div className={['button', props.className].join(' ')} onClick={props.onClick}>
      <p>{props.title ?? 'Button'}</p>
    </div>
  )
}