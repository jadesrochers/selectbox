/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import * as R from 'ramda';

const activeState = css`
  &:active {
    transform: translateY(1px);
    filter: saturate(150%);
  }
`

const baseStyle = css`
  border-width: 1px;
  border-style: solid;
  border-color: #fff;
  margin: 3px;
  width: 36px;
  height: 24px;
  padding: 1.0em 1.4em;
  background-color: #3498db;
  pointerEvents: 'all';
  font-size: 0.8em;
`;

const roundbutton = css`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`

// Plus symbol path
let plus = "M55,55 v -35 h 10 v 35 h 35 v 10 h -35 v 35 h -10 v -35 h -35 v -10 h 35"
// Minus symbol path
let minus = "M20,55 h 80 v 10 h -80 v -10 "
// Circle that encolses the plus or minus
let circledark = `<circle stroke="#212f3c" stroke-width="10" fill="none" cx="60" cy="60" r="55" />` 
let circlelight = `<circle stroke="#f2f3f4" stroke-width="10" fill="none" cx="60" cy="60" r="55" />` 

const svgwrap = R.curry((width, height, path) => {
  return ( `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" > ${path} </svg>` )
})

const svgtouri = (svg) => {
  return R.concat('data:image/svg+xml;charset=US-ASCII,')(encodeURIComponent(svg)) 
}

const svgwrap120 = svgwrap(120, 120)

const formEncodedSvg = R.pipe(
  svgwrap120,
  svgtouri,
)

let darkplus = formEncodedSvg(`<path fill="#212f3c" d="${plus}" /> ${circledark}`)
let lightplus = formEncodedSvg(`<path fill="#f2f3f4" d="${plus}" /> ${circlelight} `)
let darkminus = formEncodedSvg(`<path fill="#212f3c" d="${minus}" /> ${circledark}`)
let lightminus = formEncodedSvg(`<path fill="#f2f3f4" d="${minus}" /> ${circlelight}`)

const backgroundSetup = {
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: '1.8em 1.8em',
}

const hoverPlus = css`
  &:hover {
    background-image: url(${lightplus});
  }
`

const hoverMinus = css`
  &:hover {
    background-image: url(${lightminus});
  }
`

const backgroundplus = { 
  backgroundImage: `url(${darkplus})`,
  borderColor: '#f2f3f4',
}

const backgroundminus = { 
  backgroundImage: `url(${darkminus})`,
  borderColor: '#f2f3f4',
}


// Expects a limitHook and resets it to a large range
const ZoomButtons = (props) => {
  return(
   <div 
     width={80}  
     height={40}
     x={props.xoffset}
     y={props.yoffset}
   >
       <button 
         onClick={() => {
           props.zoomin()
         } }
         css={[ baseStyle, activeState, backgroundSetup, backgroundplus, hoverPlus, roundbutton, 
         (props.cssStyles ? props.cssStyles : undefined)]}
       >
       </button>
       <button 
         onClick={() => {
           props.zoomout()
         } }
         css={[ baseStyle, activeState, backgroundSetup, backgroundminus, hoverMinus,roundbutton, 
         (props.cssStyles ? props.cssStyles : undefined)]}
       >
       </button>
   </div>
  )
}

export { ZoomButtons }
