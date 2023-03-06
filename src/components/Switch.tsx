import React, { useEffect, useMemo, useState } from "react";
import useThemedClass from "../utils/useThemedClass";

export interface SwitchProps {
  size?: number;
  title?: string;
  initialState?: boolean;
  onSwitch?: (value: boolean) => void;
}

const keyframeFunc = (x: number, a: number) => {
  const ra = a ** (1 / 1.6);
  const rx = x ** (1 / 1.6);

  return (ra - rx) / ra
};

function createDimentions(size: number) {
  const height = 20 * size;
  const width = 40 * size;

  const indicatorDiameter = height * .8;
  const indicatorY = (height - indicatorDiameter) / 2;
  const indicatorRadius = indicatorDiameter / 2;

  const indicatorX = {
    actived: width - indicatorDiameter - indicatorY,
    desactived: indicatorY,
  };
  const indicatorXDif = indicatorX.actived - indicatorX.desactived;

  const keyframes: number[] = [];
  const keyframesLen = 20;

  for (let i = 0; i < keyframesLen; i++) {
    keyframes[i] = keyframeFunc(i, keyframesLen - 1);
  }

  const activeKeyframes = keyframes.map(v => indicatorX.actived - v * indicatorXDif);
  const desactiveKeyframes = keyframes.map(v => indicatorX.desactived + v * indicatorXDif);

  const lineWidth = width * .7;
  const lineHeight = height * .2;
  const lineX = (width - lineWidth) / 2;
  const lineY = (height - lineHeight) / 2;
  const lineRadius = lineHeight / 2;

  return {
    height,
    width,
    indicatorDiameter,
    indicatorY,
    indicatorX,
    indicatorXDif,
    indicatorRadius,
    activeKeyframes,
    desactiveKeyframes,
    lineWidth,
    lineHeight,
    lineX,
    lineY,
    lineRadius,
  }
}

export default function Switch(props: SwitchProps) {
  const [active, setActive] = useState(props.initialState ?? false);
  const dimentions = useMemo(() => createDimentions(props.size ?? 1), [props.size]);
  const isFirstRender = useMemo(() => {
    return {
      value: true
    }
  }, []);

  let canToggle = true;
  const indicatorRef: React.RefObject<SVGRectElement> = {
    current: null,
  };

  function onfinishAnimation(this: Animation, ev: AnimationPlaybackEvent) {
    canToggle = true;
  }

  function animate() {
    if (isFirstRender.value) {
      isFirstRender.value = false;
      return;
    }
    const indicatorRect = indicatorRef.current;
    if (!indicatorRect) return;
    canToggle = false;

    const animation = indicatorRect.animate({
      x: active ? dimentions.activeKeyframes : dimentions.desactiveKeyframes,
    }, {
      duration: 500,
    });

    animation.onfinish = onfinishAnimation;
  }

  useEffect(animate, [active]);

  function clickHandler() {
    if (canToggle) {
      const newActiveValue = !active;

      props.onSwitch?.(newActiveValue);
      setActive(newActiveValue);
    };
  }

  return (
    <div className='switch-div'>
      <svg
        onClick={clickHandler}
        height={dimentions.height}
        width={dimentions.width}>
        <rect
          className={useThemedClass('switch-body')}
          width={dimentions.width}
          height={dimentions.height}
          rx={dimentions.indicatorRadius} />
        <rect
          width={dimentions.lineWidth}
          height={dimentions.lineHeight}
          rx={dimentions.lineRadius}
          x={dimentions.lineX}
          y={dimentions.lineY}
          fill='#888' />
        <rect
          ref={indicatorRef}
          width={dimentions.indicatorDiameter}
          height={dimentions.indicatorDiameter}
          rx={dimentions.indicatorRadius}
          x={dimentions.indicatorX[active ? 'actived' : 'desactived']}
          y={dimentions.indicatorY}
          fill='#26b' />
      </svg>
      <p>{props.title}</p>
    </div>
  )
}