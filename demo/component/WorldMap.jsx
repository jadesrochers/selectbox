// This is possible because of a webpack resolve alias that points
// selectbox to ../../src/index.js
import { CustomMap } from "geomap";
import React, { useEffect, useState } from "react";
import { geoEqualEarth } from "d3-geo";
import * as R from "ramda";
import worldgeojson from "../geojson/gz_2010_World_110m.json";

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

const projectEqualEarth = scale =>
  geoEqualEarth()
    .scale(scale)
    .translate([770, 530]);


// The ToolTipMap must contain the custom map to get data tooltip support.
const WorldSvg = props => {
  /* const path = "https://raw.githubusercontent.com/jadesrochers/geomap/master/src/__tests__/worldmap110m.json"; */
  /* let worldgeo = useLoadMap(path); */
  //console.log('the other data: ',otherdata)
  // The datakey will determine the path for the topology in the output
  if (!worldgeojson) {
    return null;
  }
  const randdata = worldgeojson.features.map(feat => {
    const item = {};
    item[feat.properties.sov_a3] = Math.random() * 100;
    return item;
  });
  const data = R.mergeAll(randdata);

  return (
    <CustomMap
      projection={projectEqualEarth}
      featurename={"countries"}
      featurekey={"sov_a3"}
      scaling={400}
      getgeofeat={worldgeojson}
      data={data}
      tooltipkey={"name_sort"}
      formatter={input => Math.round(input)}
      legendstyle={{
        fontSize: "0.7em",
      }}
      barheight={25}
      style={{
        fill: "#f4f6f6",
        stroke: "#707b7c",
        strokeLinejoin: "round"
      }}
      datastyle={{
        stroke: "#323535",
        strokeLinejoin: "round"
      }}
      tooltipwidth={260}
      tooltipheight={120}
      tooltipstyle={{ fontSize: "2.0rem" }}
      limitHook={{ xlimits: { min: 0, max: 100 } }}
      {...props}
    />
  );
};


const WorldMap = props => {
  return (
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
        <h2>Custom World Map</h2>
        <p> React + d3-geo</p>
        <p>
          Map of world using CustomMap component from @jadesrochers/geomap
          <br />
          Using a projection from d3-geo and some random data generation.
        </p>
        <p>The styles can all be configured</p>
        <p> Zoom, Hover, refresh for new data</p>
      </div>
        <WorldSvg />
    </div>
  );
}

export { WorldMap };
