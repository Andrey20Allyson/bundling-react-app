import React from "react";
import useThemedClass from "../utils/useThemedClass";

export default function Title(props: React.ComponentProps<'h1'>) {
  return (
    <h1 className={useThemedClass('fancy-text')} {...props}/>
  )
}