/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import * as R from 'ramda';
import React, { useMemo } from 'react';
/* import fm from '@jadesrochers/functionalmonads'; */
import { passExceptChildren } from '@jadesrochers/reacthelpers'

import { useTrackSvgBounds,  useSvgXSizing, useSvgYSizing, useMouseLocation, useMouseDownLocation, useMouseUpLocation, useMouseClickLocation, useMouseStatus, useMouseSelection, useSelectOffset, getEventX, getEventY } from './selections'

const roundtenth = (n) => (Math.round(n*10)/10)

const selectStyle={fill: '#808080', opacity: '0.3', cursor: 'crosshair'}

const SelectXRect = (props) => {
  return(
    <rect 
       css={[ selectStyle,
       {transform: `translate(${props.offx}px,0px)` },
       (props.cssStyles ? props.cssStyles : undefined)]}
      width={props.selectx} height={props.height}
    >
    </rect>
  )
}

const SelectYRect = (props) => {
  return(
    <rect 
       css={[ selectStyle,
       {transform: `translate(0px, ${props.offy}px)` },
       (props.cssStyles ? props.cssStyles : undefined)]}
      width={props.width} height={props.selecty}
    >
    </rect>
  )
}

const SelectXYRect = (props) => {
  return(
      <rect 
         css={[ selectStyle,
         {transform: `translate(${props.offx}px,${props.offy}px)` },
         (props.cssStyles ? props.cssStyles : undefined)]}
        width={props.selectx} height={props.selecty}
      >
      </rect>
  )
}

// the argument to ref is a function that takes the node and gets all
// the dimensions to reset the height/width/top/left if the node size
// changes. Part of the trackBounds hook that passes the size info elsewhere.
const MouseRect = (props) => {
  const cursortype = props.cursor ? props.cursor : 'crosshair'
  return(
    <rect 
    ref={props.trackBounds.measuredRef}
    x='0' y='0'
    css={[
      {fill: 'none', cursor: cursortype, pointerEvents: 'all'},
      props.cssStyles ? props.cssStyles : undefined
      ]}
      width={props.width} height={props.height}
    >
    </rect>
  )
}

const isBarHighlightedX = R.curry((xpair, offx, endx) => {
  let highlight = false
  const midpt = R.mean(R.values(xpair))
  if(offx < midpt && endx > midpt){
    highlight = true 
  }
  return highlight
})

const BarXlimits = R.curry((setlimits, pairs, startx, endx) => { 
  return R.pipe(
    R.filter(pair => isBarHighlightedX(pair, startx, endx)),
    (arr) => (arr.length ? arr : [{a: -9999, b: 9999}]),
    R.map(R.values),
    R.flatten,
    (vals) => ([vals.reduce(R.min), vals.reduce(R.max)]),
    (mm) => ((mm[0] === -9999 && mm[1] === 9999) ? 0 : setlimits(mm)), 
  )(pairs)
})


// This Component sets up an svg element that will nest, so not the best 
// idea there perhaps.
// That aside, its job is to use information passed to it about
// histogram bars (uses props.plotData) to determine which bars have
// been selected, and set those values using the limitHook setLimits() fcn.
// The children should be a SelectX/YRect to show the highlighted area
// and a Mouserect if you want the cursor change, and possibly for event capture.
// It had an onClick() listener, but I could not see any reason this
// should have been there.
// IMPROVE: I think it needs to have some behavior specified to deal with
// mouseout scenarios. Maybe clear limits, or set them, when mouse leaves.
// This relates to the problem with the histogram reset button.
const SetBarxLimits = (props) => {
  const propsToChildren = passExceptChildren(props)
      /* onClick={(e) => { */
      /*   BarXlimits(props.limitHook.setLimits('x'), props.plotData, props.offx, (props.offx + props.selectx) ) */
      /*   } */
      /* } */

  return(
    <svg
      onMouseUp={(e) => {
        BarXlimits(props.limitHook.setLimits('x'), props.plotData, props.offx, (props.offx + props.selectx) )
        }
      }
      onTouchEnd={(e) => BarXlimits(props.limitHook.setLimits('x'), props.plotData, props.offx, (props.offx + props.selectx) )
      }
    >
      { propsToChildren }
    </svg>
  )
}

const getEventXY = (xsizing, ysizing, trackBounds, e) => {
  const x = roundtenth(xsizing * (getEventX(e) - trackBounds.left))
  const y = roundtenth(ysizing * (getEventY(e) - trackBounds.top))
  return [x, y]
}

const SelectBase = (props) => {
  const { ismousedown, setmousedown} = useMouseStatus()
  const { startx, starty, mousedown} = useMouseDownLocation()
  const { endx, endy, mouseup } = useMouseUpLocation()
  const { clickx, clicky, mouseclick } = useMouseClickLocation()
  const { selectx, selecty, dragx, dragy, setselection } = useMouseSelection()
  const { offx, offy, setoff } = useSelectOffset()
  const { x, y, mousemove } = useMouseLocation()
  const trackBounds = useTrackSvgBounds()
  const xsizehook = useSvgXSizing()
  const ysizehook = useSvgYSizing()

  useMemo(() => {
    xsizehook.calcxscale(props.sizex, trackBounds.width)
    ysizehook.calcyscale(props.sizey, trackBounds.height)
  }, [trackBounds.width, trackBounds.height])
  const pass = R.omit(['width', 'height', 'cssStyles'])(props)
  const propsToChildren = passExceptChildren({...pass, x, y, startx, starty, endx, endy, clickx, clicky, selectx, selecty, offx, offy, dragx, dragy, trackBounds, setselection, ismousedown }, props.children) 
 
  return(
   <div  
      alt='base select box'
      css={[ 
        {width: props.width, height: props.height, overflow:"hidden"},
         props.cssStyles ? props.cssStyles : undefined 
        ]}

      onClick={(e) => {
        const [x, y] = getEventXY(xsizehook.xsizing, ysizehook.ysizing, trackBounds, e)
        if(Math.abs(x-startx)<2 && Math.abs(y-starty)<2){ mouseclick(x, y) }
        }
      }
      onMouseMove={(e) => {
        if(! ismousedown){ return }
        const [x, y] = getEventXY(xsizehook.xsizing, ysizehook.ysizing, trackBounds, e)
        mousemove(x, y)
        setselection(ismousedown, startx, starty, x, y) 
        setoff(ismousedown, startx, starty, x, y) 
        }
      }
      onMouseDown={(e) => {
        setmousedown(true)
        const [x, y] = getEventXY(xsizehook.xsizing, ysizehook.ysizing, trackBounds, e)
        mousemove(x, y)
        mousedown(x, y)
        }
      }
      onMouseUp={(e) => {
        setmousedown(false) 
        mouseup(dragx, dragy) 
        }
      }
      onMouseLeave={(e) => {
        if(! ismousedown){ return }
        setmousedown(false)
        mouseup(dragx, dragy)
        }
      }

      onTouchStart={(e) =>  {
        setmousedown(true)
        const [x, y] = getEventXY(xsizehook.xsizing, ysizehook.ysizing, trackBounds, e)
        mousemove(x, y)
        mousedown(x, y)
        }
      }
      onTouchMove={(e) => {
        if(! ismousedown){ return }
        const [x, y] = getEventXY(xsizehook.xsizing, ysizehook.ysizing, trackBounds, e)
        mousemove(x, y)
        setselection(ismousedown, startx, starty, x, y) 
        setoff(ismousedown, startx, starty, x, y) 
        }
      }
      onTouchEnd={(e) => {
        setmousedown(false) 
        mouseup(dragx, dragy) 
        }
      }
      onTouchCancel={(e) => {
        if(! ismousedown){ return }
        setmousedown(false) 
        mouseup(dragx, dragy) 
        }
      }

   >
      { propsToChildren }
   </div>
  )
}

export { SelectBase, SelectXRect, SelectYRect, SelectXYRect, MouseRect, SetBarxLimits, isBarHighlightedX, BarXlimits }
