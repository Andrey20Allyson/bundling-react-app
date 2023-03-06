import React, { useState } from "react";
import useThemedClass from "../utils/useThemedClass";

export interface ConfigButtonProps {

}

export interface SVGPointProps {
  color?: string;
  size?: number;
  x?: number;
  y?: number;
}

export function SVGPoint(props: SVGPointProps) {
  const { color, size = 0, x = 0, y = 0 } = props;

  const style: React.CSSProperties = {
    fill: color,
  };

  return (
    <rect width={size} height={size} x={x} y={y} rx={size / 2} ry={size / 2} style={style} />
  )
}

export default function ConfigButton(props: ConfigButtonProps) {
  const [{ points }, setState] = useState(() => {
    const points = [];

    for (let i = 0; i < 3; i++) {
      points.push(<SVGPoint size={4} y={(20 - 4) * (i / 2)} key={i} />);
    }

    return {
      points,
    }
  });

  return (
    <div className={useThemedClass('config-button')}>
      <svg width={4} height={20}>
        {points}
      </svg>
    </div>
  )
}