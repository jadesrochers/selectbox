import React from "react";
import ReactDOM from "react-dom";
import { SelectBase, MouseRect } from "./src/selectbox";
import { ViewBoxZoomPan } from "./src/viewbox";
import { useZoomPan } from "./src/zoom";

const SelectTest = props => {
  const { scale, zoomin, zoomout, pan, shiftxpct, shiftypct } = useZoomPan(
    2.0,
    1.0
  );
  let pass = {
    zoomin: zoomin,
    pan: pan,
    scale: scale,
    zoomout: zoomout,
    shiftxpct: shiftxpct,
    shiftypct: shiftypct
  };
  return (
    <div>
      <SelectBase
        width="80vh"
        height="90vh"
        sizex={250}
        sizey={400}
        cssStyles={{
          backgroundColor: "#a5a4e7",
          display: "flex",
          justifyContent: "start",
          flexDirection: "row",
          border: "2px solid #565656"
        }}
        {...pass}
      >
        <ViewBoxZoomPan
          key="viewbox"
          width={"99%"}
          height={"99%"}
          viewBox={"0 0 250 420"}
        >
          <MouseRect width="99%" height="99%" />
        </ViewBoxZoomPan>
      </SelectBase>
    </div>
  );
};

const SelectDemo = props => {
  return (
    <g>
      <rect
        x="0"
        y="10"
        width="250px"
        height="400px"
        stroke="black"
        fill="transparent"
        ref={props.trackBounds.measuredRef}
      />

      <ellipse
        cx="125"
        cy="125"
        rx="100"
        ry="20"
        fill="yellow"
        transform={`rotate(${props.y / 1},125,125)`}
      />
      <ellipse
        cx="125"
        cy="125"
        rx="20"
        ry="100"
        fill="yellow"
        transform={`rotate(${props.x / 1},125,125)`}
      />
      <circle
        cx="125"
        cy="125"
        r={60 + 0.1 * props.selectx}
        fill="orange"
        transform="scale()"
        j
      />
      <circle
        cx="125"
        cy="125"
        r="40"
        fill={`rgb(240,${200 - props.offx},${200 - props.offy})`}
        transform="rotate()"
      />

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

const rootElement = document.getElementById("root");
ReactDOM.render(<SelectTest />, rootElement);
