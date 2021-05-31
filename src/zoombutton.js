/** @jsx jsx */
import React from "react";
import { css, jsx } from '@emotion/react'

const activeState = css`
  &:active {
    transform: translateY(1px);
    filter: saturate(150%);
  }
`

const hoverCirc = css`
  &:hover svg circle {
    stroke: hsl(220,85%,15%);
  }
`

const hoverPath = css`
  &:hover svg path {
    fill: #f2f3f4;  
  }
`

// background: none is critical to wipeout default button coloring
const baseStyle = css`
  margin: 3px;
  padding: 0;
  border: 0;
  width: 55px;
  height: 55px;
  background: none;
  pointer-events: 'all';
`;

// An open circle with a plus in it
const PlusCircle = (props) => {
  return(
    <svg css={[ { height: '95%', padding: '1px', shapeRendering:'geometricPrecision' } ]} viewBox='-1 -1 125 125'>
      <circle css={[ { stroke:"hsl(210,85%,30%)", fill:"#3498db"} ]} strokeWidth="12" cx="60" cy="60" r="55" />` 
      <path css={[ { fill:"#212f3c" } ]} d="M55,55 v -35 h 10 v 35 h 35 v 10 h -35 v 35 h -10 v -35 h -35 v -10 h 35" />
    </svg>
  )
}

const MinusCircle = (props) => {
  return(
    <svg css={[ { height: '95%', padding: '1px', shapeRendering:'geometricPrecision'  } ]} viewBox='-1 -1 125 125'>
      <circle css={[ { stroke:"hsl(210,85%,30%)", fill:"#3498db"} ]} strokeWidth="12" cx="60" cy="60" r="55" />` 
      <path css={[ { fill: "#212f3c" } ]} d="M20,55 h 80 v 10 h -80 v -10" />
    </svg>
  )
}

// Expects a limitHook and resets it to a large range
/* width:'122px',height:'60px', */
const ZoomButtons = (props) => {
  return(
   <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
       <button 
         onClick={() => {
           props.zoomin()
         } }
         css={[ baseStyle, activeState, hoverCirc, hoverPath, (props.cssStyles ? props.cssStyles : undefined)]}
       >
         <PlusCircle />
       </button>
       <button 
         onClick={() => {
           props.zoomout()
         } }
         css={[ baseStyle, activeState, hoverCirc, hoverPath, (props.cssStyles ? props.cssStyles : undefined)]}
       >
         <MinusCircle />
       </button>
   </div>
  )
}

export { ZoomButtons }
