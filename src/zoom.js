import  { useState, useRef } from 'react'
import * as R from 'ramda'
import { roundtenth } from '@jadesrochers/reacthelpers'

const thresholdlimit = R.curry((input, th) => R.pipe(
    parseInt,
    R.max(-th),
    R.min(th),
    Math.round,
  )(input))

const offsetlimit = (scale) => Math.round(100 - (100 * Math.pow(1.5,-(scale - 1))))

const topct = R.pipe(
  parseInt,
  (arg) => `${arg}%`,
)

const thresholdscalepct = R.curry((scale, input) => R.pipe(
  offsetlimit,
  thresholdlimit(input),
  topct,
)(scale))

const thresholdscale = R.curry((scale, input) => R.pipe(
  offsetlimit,
  thresholdlimit(input),
)(scale))

const useZoomPan = (max=2, min=1, viewx=100, viewy=100 ) => {
  const [ shiftxpct, setxshift ] = useState("0%")
  const [ shiftypct, setyshift ] = useState("0%")
  const endxpct = useRef(0)
  const endypct = useRef(0)
  const [ scale, setScale ] = useState(1)

  const zoomin = () => {
    let updatescale = scale + 0.2
    // Simple scaling of scale * -5 keeps map centered during zoom.
    let defaultmove = 0.2 * -5 
    if(updatescale <= max){
      let shiftx = parseInt(shiftxpct) + defaultmove
      let shifty = parseInt(shiftypct) + defaultmove
      setxshift(`${shiftx}%`) 
      setyshift(`${shifty}%`) 
      setScale(updatescale)
      endxpct.current = shiftx 
      endypct.current = shifty 
    }
  }
  const zoomout = () => {
    let updatescale = scale - 0.2
    if(updatescale >= min){
      setScale(updatescale)
      let offxzoom = thresholdscalepct(updatescale, shiftxpct)
      let offyzoom = thresholdscalepct(updatescale, shiftypct)
      setyshift(offyzoom) 
      setxshift(offxzoom) 
      endxpct.current = thresholdscale(updatescale, endxpct.current) 
      endypct.current = thresholdscale(updatescale, endypct.current)
    }
  }
  const pan = (trackBounds, x, y, ismousedown) => {
    let offx = roundtenth((x / viewx)/(scale)*100 + endxpct.current)
    let offy = roundtenth((y / viewy)/(scale)*100 + endypct.current)
    offx = thresholdscale(scale, offx)
    offy = thresholdscale(scale, offy)

    if(! ismousedown ){
      endxpct.current = offx 
      endypct.current = offy 
    }

    setxshift(`${roundtenth(offx)}%`)
    setyshift(`${roundtenth(offy)}%`)
  }

  return { scale, zoomin, zoomout, pan, shiftxpct, shiftypct }
}

export { useZoomPan }
