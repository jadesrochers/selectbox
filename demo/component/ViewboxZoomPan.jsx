import React from "react";
import styles from "./ViewboxZoomPan.module.css"

// This is possible because of a webpack resolve alias that points
// selectbox to ../../src/index.js
import { SelectBase, MouseRect, ZoomButtons, ViewBoxZoomPan, useZoomPan } from "selectbox";

const ViewboxzoompanTest = props => {
  const xsize = 240;
  const ysize = 380;
  const { scale, zoomin, zoomout, pan, shiftxpct, shiftypct } = useZoomPan(
    3.0,
    1.0,
    xsize,
    ysize
  );
  const pass = {
    zoomin,
    pan,
    scale,
    zoomout,
    shiftxpct,
    shiftypct
  };
  return (
    <div
      className="SelectTest"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <h3> Selectbox and ViewPanZoomBox</h3>
      <h4> All the mouse/touch tracking done with React Hooks</h4>
      <p>
        {" "}
        As you click/touch and move, you can see how all the <br />
        parameters being tracked change.<br />
        The Svg elements will transform, you can play around <br />
        with zoom/pan as well!
      </p>
      <SelectBase
        width="50vh"
        height="70vh"
        sizex={xsize}
        sizey={ysize}
        classnames={[styles.selectbaseColor, styles.selectbaseDisplay]}
        // cssStyles={{
        //   backgroundColor: "#a5a4e7",
        //   display: "flex",
        //   justifyContent: "start",
        //   flexDirection: "row",
        //   border: "2px solid #565656"
        // }}
        {...pass}
      >
        <ViewBoxZoomPan
          key="viewbox"
          width={"100%"}
          height={"100%"}
          viewBox={`0 0 ${xsize} ${ysize}`}
        >
          <MouseRect key="mouseRect" width="100%" height="100%" />
          <SelectDemo key="SelectDemo" />
        </ViewBoxZoomPan>
      </SelectBase>
      <ZoomButtons 
        classnames={[styles.zoomButtonSize]} 
        {...pass} 
      />
    </div>
  );
};

//<MouseRect x='0' y='0' width="99%" height="99%" />
const SelectDemo = props => {
  return (
    <g>
      <ellipse
        cx="120"
        cy="120"
        rx="100"
        ry="20"
        fill="yellow"
        transform={`rotate(${props.y / 1},120,120)`}
      />
      <ellipse
        cx="120"
        cy="120"
        rx="20"
        ry="100"
        fill="yellow"
        transform={`rotate(${props.x / 1},120,120)`}
      />
      <circle
        cx="120"
        cy="120"
        r={60 + 0.1 * props.selectx}
        fill="orange"
      />
      <circle
        cx="120"
        cy="120"
        r="40"
        fill={`rgb(240,${200 - props.offx},${200 - props.offy})`}
      />

      <text x="20" y="270" fontSize="10">
        Height: {props.trackBounds.height}
      </text>
      <text x="20" y="285" fontSize="10">
        Width: {props.trackBounds.width}
      </text>
      <text x="20" y="300" fontSize="10">
        x: {props.x}
      </text>
      <text x="20" y="315" fontSize="10">
        y: {props.y}
      </text>
      <text x="20" y="330" fontSize="10">
        clickx: {props.clickx}
      </text>
      <text x="20" y="345" fontSize="10">
        clicky: {props.clicky}
      </text>
      <text x="20" y="360" fontSize="10">
        startx: {props.starty}
      </text>
      <text x="20" y="375" fontSize="10">
        starty: {props.starty}
      </text>

      <text x="120" y="270" fontSize="10">
        endx: {props.endx}
      </text>
      <text x="120" y="285" fontSize="10">
        endy: {props.endy}
      </text>
      <text x="120" y="300" fontSize="10">
        offx: {props.offx}
      </text>
      <text x="120" y="315" fontSize="10">
        offy: {props.offy}
      </text>
      <text x="120" y="330" fontSize="10">
        selectx: {props.selectx}
      </text>
      <text x="120" y="345" fontSize="10">
        selecty: {props.selecty}
      </text>
      <text x="120" y="360" fontSize="10">
        bounds left: {props.trackBounds.left}
      </text>
      <text x="120" y="375" fontSize="10">
        bounds top: {props.trackBounds.top}
      </text>
    </g>
  );
};

export { ViewboxzoompanTest };
