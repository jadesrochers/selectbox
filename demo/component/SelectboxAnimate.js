import React, { useRef, useEffect, useMemo } from "react";
import * as R from "ramda";
// This is possible because of a webpack resolve alias that points
// selectbox to ../../src/index.js

import { SelectBase, ViewBoxConst, MouseRect } from "selectbox";

const usePrev = val => {
  const prev = useRef(val);
  useEffect(() => {
    prev.current = val ? val : 10;
  }, [val]);
  return prev.current;
};

const OrbitSvg = props => {
  const prev = usePrev(Math.abs(props.endy % 200) / 7);
  const orbittime = props.endy ? Math.abs(props.endy % 200) / 7 : 10;

  useMemo(() => {
    if (props.orbitref.current) {
      const animationtime = props.orbitref.current.getCurrentTime();
      const newtime = (orbittime / prev) * animationtime;
      props.orbitref.current.setCurrentTime(newtime);
    }
  }, [props.endy]);

  return (
    <g>
      <ellipse
        cx={125}
        cy={125}
        rx="100"
        ry="20"
        fill="yellow"
        transform={`rotate(${props.y / 1},125,125)`}
      />
      <ellipse
        cx={125}
        cy={125}
        rx="20"
        ry="100"
        fill="yellow"
        transform={`rotate(${props.x / 1},125,125)`}
      />
      <circle
        cx={125}
        cy={125}
        r={60 + 0.1 * props.selectx}
        fill="orange"
      />
      <circle
        cx={125}
        cy={125}
        r="40"
        fill={`rgb(240,${200 - props.offx},${200 - props.offy})`}
      />
      <circle cx="" cy="" r="5" fill="red">
        <animateMotion
          dur={`${orbittime}s`}
          repeatCount="indefinite"
          path="M 125 15 A 110 122 0 1 1 124.9 15"
        />
      </circle>

      <text x="20" y="285" fontSize="10">
        Height: {props.trackBounds.height}
      </text>
      <text x="20" y="300" fontSize="10">
        Width: {props.trackBounds.width}
      </text>
      <text x="20" y="315" fontSize="10">
        x: {props.x}
      </text>
      <text x="20" y="330" fontSize="10">
        y: {props.y}
      </text>
      <text x="20" y="345" fontSize="10">
        clickx: {props.clickx}
      </text>
      <text x="20" y="360" fontSize="10">
        clicky: {props.clicky}
      </text>
      <text x="20" y="375" fontSize="10">
        startx: {props.starty}
      </text>
      <text x="20" y="390" fontSize="10">
        starty: {props.starty}
      </text>

      <text x="120" y="285" fontSize="10">
        endx: {props.endx}
      </text>
      <text x="120" y="300" fontSize="10">
        endy: {props.endy}
      </text>
      <text x="120" y="315" fontSize="10">
        offx: {props.offx}
      </text>
      <text x="120" y="330" fontSize="10">
        offy: {props.offy}
      </text>
      <text x="120" y="345" fontSize="10">
        selectx: {props.selectx}
      </text>
      <text x="120" y="360" fontSize="10">
        selecty: {props.selecty}
      </text>
      <text x="120" y="375" fontSize="10">
        bounds left: {props.trackBounds.left}
      </text>
      <text x="120" y="390" fontSize="10">
        bounds top: {props.trackBounds.top}
      </text>
    </g>
  );
};

const SelectboxAnimate = props => {
  const xsize = 250;
  const ysize = 400;
  const orbitref = React.createRef();

  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <h3>
        {" "}
        SelectBox values use for SVG <br />
        manipulation and animation{" "}
      </h3>
      <p>
        {" "}
        The svg can be manipulated by clicking around, <br />
        selecting
      </p>
      <p>
        {" "}
        The changes to the svg/animation is just to <br />
        show how all the values produced by SelectBox <br />
        could be used.
      </p>
      <SelectBase
        width="50vh"
        height="80vh"
        sizex={xsize}
        sizey={ysize}
        cssStyles={{
          backgroundColor: "#a5a4e7",
          display: "flex",
          justifyContent: "start",
          flexDirection: "row"
        }}
      >
        <ViewBoxConst
          svgref={orbitref}
          key="viewbox"
          width={"100%"}
          height={"100%"}
          viewBox={`0 0 ${xsize} ${ysize}`}
        >
          <MouseRect
            key="mouserect"
            width="100%"
            height="100%"
            cssStyles={{ stroke: "#2c3737", strokeWidth: "2px" }}
          />
          <OrbitSvg key={'orbitsvg'} orbitref={orbitref} />
        </ViewBoxConst>
      </SelectBase>
    </div>
  );
};

export { SelectboxAnimate };
