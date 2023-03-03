import React from "react";

export default function Title(props: React.ComponentProps<'h1'>) {
  return (
    <h1 className="fancy-text" {...props}/>
  )
}