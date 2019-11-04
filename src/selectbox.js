/** @jsx jsx */
import { jsx } from '@emotion/core'
import * as R from 'ramda';
import { useMemo } from 'react';
import { useTrackSvgBounds,  useSvgXSizing, useSvgYSizing, useMouseLocation, useMouseDownLocation, useMouseUpLocation, useMouseClickLocation, useMouseStatus, useMouseSelection, useSelectOffset, getEventX, getEventY } from './selections'
import fm from '@jadesrochers/functionalmonads';
import { roundtenth, passExceptChildren } from '@jadesrochers/reacthelpers'


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
  return fm.pipeMayFalsy(
    R.filter(pair => isBarHighlightedX(pair, startx, endx)),
    (arr) => (arr.length ? arr : 0),
    R.map(R.values),
    R.flatten,
    (vals) => ([vals.reduce(R.min), vals.reduce(R.max)]),
    setlimits, 
  )(pairs)
})


const SetBarxLimits = (props) => {
  const propsToChildren = passExceptChildren(props)
  return(
    <svg
      onMouseUp={(e) => {
        BarXlimits(props.limitHook.setLimits('x'), props.plotData, props.offx, (props.offx + props.selectx) )
        }
      }
      onClick={(e) => {
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
  let x = roundtenth(xsizing * (getEventX(e) - trackBounds.left))
  let y = roundtenth(ysizing * (getEventY(e) - trackBounds.top))
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
  let pass = R.omit(['width', 'height', 'cssStyles'])(props)
  const propsToChildren = passExceptChildren({...pass, x, y, startx, starty, endx, endy, clickx, clicky, selectx, selecty, offx, offy, dragx, dragy, trackBounds, setselection, ismousedown }, props.children) 
 
  return(
   <div  
      css={[ 
        {width: props.width, height: props.height, overflow:"hidden"},
         props.cssStyles ? props.cssStyles : undefined 
        ]}

      onClick={(e) => {
        let [x, y] = getEventXY(xsizehook.xsizing, ysizehook.ysizing, trackBounds, e)
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

export { SelectBase, SelectXRect, SelectYRect, SelectXYRect, MouseRect, SetBarxLimits, isBarHighlightedX }
