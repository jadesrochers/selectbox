import React from "react";
// This is possible because of a webpack resolve alias that points
// selectbox to ../../src/index.js
import styles from "./Selectbox.module.css"

import { SelectBase, ViewBoxConst, SelectXRect, SelectYRect, SelectXYRect, MouseRect } from "selectbox";

const SelectTest = props => {
  const sizex = 300;
  const sizey = 500;
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
        Selection Rectangles <br />
        Designed for figure/drawing selection
      </h3>
      <p>
        x, y, and xy selection rectangles are drawn <br />
        when you click and drag.
      </p>
      <SelectBase
        width='50vh'
        height='80vh'
        sizex={sizex}
        sizey={sizey}
        classnames={[styles.selectBaseColor, styles.selectBaseDisplay]}
      >
        <ViewBoxConst
          key="viewbox"
          width={"100%"}
          height={"100%"}
          viewBox={`0 0 ${sizex} ${sizey}`}
          classnames={[styles.viewboxColor]}
        >
          <SelectXRect height="100px" classnames={[styles.xrect]} />
          <SelectYRect width="100px" classnames={[styles.yrect]} />
          <SelectXYRect classnames={[styles.xyrect]} />
          <Textdisplay />
          <MouseRect width="99%" height="99%" />
        </ViewBoxConst>
      </SelectBase>
      <p>
        x/y selection boxes height/width set to 100 <br />
        so that the xy box can be seen
      </p>
    </div>
  );
};

const Textdisplay = props => {
  return (
    <g>
      <text x="20" y="385" fontSize="10">
        Height: {props.trackBounds.height}
      </text>
      <text x="20" y="400" fontSize="10">
        Width: {props.trackBounds.width}
      </text>
      <text x="20" y="415" fontSize="10">
        x: {props.x}
      </text>
      <text x="20" y="430" fontSize="10">
        y: {props.y}
      </text>
      <text x="20" y="445" fontSize="10">
        clickx: {props.clickx}
      </text>
      <text x="20" y="460" fontSize="10">
        clicky: {props.clicky}
      </text>
      <text x="20" y="475" fontSize="10">
        startx: {props.starty}
      </text>
      <text x="20" y="490" fontSize="10">
        starty: {props.starty}
      </text>

      <text x="120" y="385" fontSize="10">
        endx: {props.endx}
      </text>
      <text x="120" y="400" fontSize="10">
        endy: {props.endy}
      </text>
      <text x="120" y="415" fontSize="10">
        offx: {props.offx}
      </text>
      <text x="120" y="430" fontSize="10">
        offy: {props.offy}
      </text>
      <text x="120" y="445" fontSize="10">
        selectx: {props.selectx}
      </text>
      <text x="120" y="460" fontSize="10">
        selecty: {props.selecty}
      </text>
      <text x="120" y="475" fontSize="10">
        bounds left: {props.trackBounds.left}
      </text>
      <text x="120" y="490" fontSize="10">
        bounds top: {props.trackBounds.top}
      </text>
    </g>
  );
};

export { SelectTest };
