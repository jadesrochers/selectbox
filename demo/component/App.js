import React from "react";
import { Link, Router } from '@reach/router';
import { SelectTest } from "./Selectbox";
import { ViewboxzoompanTest } from "./ViewboxZoomPan";
import { SelectboxAnimate } from "./SelectboxAnimate";

import './basic.css'

const NotFound = () => {
  return(
    <div style={{ color: '#151515' }} >
      <h1> 404; Did not find that page, <br/> perhaps try another? </h1>
    </div>
  )
}

const DemoLink = (props) => (
    <Link to={props.link} style={{ margin: '10px' }} >
      <div style={{ borderRadius: '25px/20px', backgroundColor: 'hsla(200,65%,50%,01)', padding: '5px 15px' }} >
         { props.display }
      </div>
    </Link>
)

const Home = (props) => {
 return (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: '100%' }} >
   <DemoLink link="selectbox" display="Selectbox X, Y, XY demos" />
   <DemoLink link="zoompanbox" display="Selectbox ZoomPan demo" />
   <DemoLink link="animatebox" display="Selectbox Animate demo" />
  </div>
 )
}

function App() {
  return (
    <div>
      <Router width='100%' height='100%' >
        <SelectTest path="/selectbox" />
        <ViewboxzoompanTest path="/zoompanbox" />
        <SelectboxAnimate path="/animatebox" />
        <NotFound default />
        <Home path="/"/>
      </Router>
    </div>
  );
}

export { App }
