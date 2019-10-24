/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useMemo } from 'react'
import * as R from 'ramda'
import { passExceptChildren } from '@jadesrochers/reacthelpers'

// Viewbox needs to go within a SelectBase to get mouse information.
// ZoomPan means it will zoom and pan the svg if zoompan hook
// is correctly set up.
const ViewBoxZoomPan = (props) => {

  let pass = R.omit(['height','width'])(props)
  const propsToChildren = passExceptChildren(pass)
  useMemo(()=> {
  props.pan(props.trackBounds, props.x-props.startx, props.y-props.starty, props.ismousedown) }, [props.dragx, props.dragy, props.ismousedown ])

  return(
  <svg key='viewbox' width={props.width} height={props.height} viewBox={props.viewBox}
   css={{transform: `scale(${props.scale}) translate(${props.shiftxpct},${props.shiftypct})`}}
  >
    { propsToChildren }
  </svg>
 )
}

// The Const viewbox keeps the same svg visible as the size changes.
// Means it scales the svg up and down with the page.
const ViewBoxConst = (props) => {

  let pass = R.omit(['height','width'])(props)
  const propsToChildren = passExceptChildren(pass)
  return(
  <svg key='viewbox' width={props.width} height={props.height} viewBox={props.viewBox}
  >
    { propsToChildren }
  </svg>
 )
}

export { ViewBoxZoomPan, ViewBoxConst }

