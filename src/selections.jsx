import { useState, useRef, useCallback } from 'react';
import * as R from 'ramda';
import { roundtenth, roundhundth } from '@jadesrochers/reacthelpers'

// Generic x coordinate getter for mouse and touch events
const getEventX = (e) => {
  let x
  if(e.targetTouches){
    x=e.touches[0].clientX 
  }else{
    x=e.clientX
  }
  return x 
}

// Generic y coordinate getter for mouse and touch events
const getEventY = (e) => {
  let y
  if(e.targetTouches){
    y=e.touches[0].clientY
  }else{
    y=e.clientY
  }
  return y
}

// Keep track of actual size of an element by using the React
// special ref argument.
// Pass the measureRef to the element you want to keep measured
// ref={measureRef} and then use the state variables as needed.
const useTrackSvgBounds = () => {
  const [height, setHeight] = useState(1);
  const [width, setWidth] = useState(1);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight( roundhundth(node.getBoundingClientRect().height) );
      setWidth( roundhundth(node.getBoundingClientRect().width) );
      setTop( roundhundth(node.getBoundingClientRect().top) );
      setLeft( roundhundth(node.getBoundingClientRect().left) );
    }
  }, []);
  return { measuredRef, height, width, top, left }
}

// Svg setups where the the containing element uses a viewBox
// to size the Svg and the actual svg size is arbitrary.
const useSvgXSizing = () => {
  const [ xsizing, setxsizing ] = useState(1)
  const calcxscale = (width, actualwidth) => {
    let sizing = roundhundth(width/actualwidth)
    if(isNaN(sizing)){ sizing = 1 }
    setxsizing( sizing ) 
  }
  return ({ xsizing, calcxscale }) 
}

const useSvgYSizing = () => {
  const [ ysizing, setysizing ] = useState(1)
  const calcyscale = (height, actualheight) => {
  let sizing = roundhundth(height/actualheight)
  if(isNaN(sizing)){ sizing = 1 }
    setysizing( sizing )
  }
  return ({ ysizing, calcyscale }) 
}

// updates the location of mouse when cursor is in element
const useMouseLocation = () => {
  const x = useRef(0)
  const y = useRef(0)
  const mousemove = R.curry((xin, yin) => {
    x.current = xin 
    y.current = yin
  })
  return ({x: x.current, y: y.current, mousemove}) 
}

// Keeps track of whether mouse button is pressed down
const useMouseStatus = () => {
  const [ismousedown, setmousedown] = useState(false)
  return ({ ismousedown, setmousedown })
}

// Store the last location where mouse button pressed down.
const useMouseDownLocation = () => {
  const [startx, setstartx] = useState(0)
  const [starty, setstarty] = useState(0)
  const mousedown = (x, y) => {
    setstartx( x )
    setstarty( y )
  }
  return ({startx, starty, mousedown})
}

// Store last location where mouse went up.
const useMouseUpLocation = () => {
  const [endx, setendx] = useState(0)
  const [endy, setendy] = useState(0)
  const mouseup = (x, y) => {
    setendx(x)
    setendy(y)
  }
  return ({endx, endy, mouseup})
}

// Store last location of mouse click
const useMouseClickLocation = () => {
  const [clickx, setclickx] = useState(0)
  const [clicky, setclicky] = useState(0)
  const mouseclick = (x, y) => {
    setclickx(x)
    setclicky(y)
  }
  return ({clickx, clicky, mouseclick})
}

// selection indicates the distance between start point where mouse
// went down and current cursor location
const useMouseSelection = () => {
  const [selectx, setxselect] = useState(0)
  const [selecty, setyselect] = useState(0)
  const [dragx, setdragx] = useState(0)
  const [dragy, setdragy] = useState(0)
  const setselection = (ismousedown, startx, starty, x, y) => {
    if( ismousedown ){
      setyselect( Math.abs(roundtenth(y - starty)) )
      setxselect( Math.abs(roundtenth(x - startx)) )
      setdragx(x)
      setdragy(y)
    }
  }
  return({ selectx, selecty, dragx, dragy, setselection })
}

// Offset indicates the x and y offset to the current selection area.
// it will either be the offset to the start or current point,
// whichever is closer to the origin.
const useSelectOffset = () => {
  const offy = useRef(0)
  const offx = useRef(0)
  const setoff = (ismousedown, startx, starty, x, y) => {
    if(ismousedown){
      offy.current = roundtenth(Math.min(y, starty))
      offx.current = roundtenth(Math.min(x, startx))
    }
  }
  return({ offx: offx.current, offy: offy.current, setoff })
}


export { 
  useMouseStatus, 
  useTrackSvgBounds,
  useSvgXSizing,
  useSvgYSizing,
  useMouseLocation,
  useMouseDownLocation,
  useMouseUpLocation,
  useMouseClickLocation,
  useMouseSelection,
  useSelectOffset,
  getEventX,
  getEventY,
}
