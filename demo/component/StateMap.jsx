// This is possible because of a webpack resolve alias that points
// selectbox to ../../src/index.js
import { UsStateMap } from "geomap";
import React, { useEffect, useState } from "react";
import stategeojson from "../geojson/gz_2010_usState_20m.json";
import * as R from "ramda";

/* const useLoadMap = path => { */
/*   const [geodata, setgeodata] = useState(undefined); */
/*   useEffect(() => { */
/*     const datagetter = async () => { */
/*       let rawgeo = await fetch(path); */
/*       rawgeo = await rawgeo.json(); */
/*       //console.log("the raw data: ", rawgeo); */
/*       let rsltgeo = { */
/*         type: rawgeo["type"], */
/*         features: rawgeo["features"] */
/*       }; */
/*       setgeodata(rsltgeo); */
/*     }; */
/*     datagetter(); */
/*   }, [path]); */
/*   return geodata; */
/* }; */


// barheight controls the scalebar SVG height.
// It should probably get re-arranged so the scalebar has args passed direct.
// to it.
const StateSvg = props => {
  /* const path = "https://raw.githubusercontent.com/jadesrochers/geomap/master/src/__tests__/gz_2010_usState_20m.json"; */
  /* let stategeo = useLoadMap(path); */
  //console.log('the other data: ',otherdata)
  // The datakey will determine the path for the topology in the output
  if (!stategeojson) {
    return null;
  }

  const randdata = stategeojson.features.map(feat => {
    const item = {};
    item[feat.properties.GEO_ID] = Math.random() * 100;
    return item;
  });
  //console.log(randdata)
  const data = R.mergeAll(randdata);

  return (
    <div
      style={{
        width: "90vw", 
        height: "70vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <UsStateMap
        data={data}
        getstates={stategeojson}
        legendstyle={{
          fontSize: "0.7em",
        }}
        barheight={25}
        formatter={input => Math.round(input)}
        statestyle={{
          fill: "#f4f6f6",
          stroke: "#707b7c",
          strokeLinejoin: "round"
        }}
        statedatastyle={{
          stroke: "#323535",
          strokeLinejoin: "round"
        }}
        baseStyle={{ outline: "none" }}
        tooltipwidth={260}
        tooltipheight={120}
        tooltipstyle={{ fontSize: "2.0rem" }}
        limitHook={{ xlimits: { min: 0, max: 100 } }}
      />
    </div>
  );
};

const StateMap = props => {
  return(
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
        textAlign: 'center',
        height: "100%",
        width: "100%"
      }}
    >
      <div style={{ width: '500px' }} >
        <h2>US State Data Map</h2>
        <p> React + d3-geo</p>
        <p>
          The state features can be passed styles to config <br />
          appearance with data, when hovered, and as an outline map.
        </p>
        <p>
          I also make use of my select/viewbox libraries <br />
          to help with zoom/pan and appearance.
        </p>
        <p> zoom, hover, pan, play around!</p>
      </div>
      <StateSvg />
    </div>
  )
}

export { StateMap };
