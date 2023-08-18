import React, { useMemo, useEffect } from 'react'
import { omit } from 'ramda'
import { passExceptChildren } from '@jadesrochers/reacthelpers'
import styles from './viewbox.module.css'


// Viewbox needs to go within a SelectBase to get mouse information.
// ZoomPan means it will zoom and pan the svg if zoompan hook
// is correctly set up.
const ViewBoxZoomPan = (props) => {
    const pass = omit(['height','width','classnames'])(props)
    const propsToChildren = passExceptChildren(pass)
    useEffect(()=> {
        props.pan(props.x-props.startx, props.y-props.starty, props.ismousedown) 
    }, [props.dragx, props.dragy, props.ismousedown ])
    const location = {transform: `scale(${props.scale}) translate(${props.shiftxpct},${props.shiftypct})`}
    const classnames = props.classnames ? props.classnames.join(' ') : styles.defaultZoomPanStyle

    return(
        <svg 
        key='viewbox' 
        alt='viewbox zoom pan'
        width={props.width} 
        height={props.height} 
        viewBox={props.viewBox}
        ref={props.svgref ? props.svgref : undefined}  
        style={location}
        className={classnames}
        // css={[ {transform: `scale(${props.scale}) translate(${props.shiftxpct},${props.shiftypct})`}
        // css={[ {transform: `scale(${props.scale}) translate(${props.shiftxpct},${props.shiftypct})`},
            // (props.cssStyles ? props.cssStyles : undefined)]}
        >
        { propsToChildren }
        </svg>
    )
} 


// The Const viewbox keeps the same svg visible as the size changes.
// Means it scales the svg up and down with the page.
const ViewBoxConst = (props) => {
    const pass = omit(['height','width','classnames'])(props)
    const propsToChildren = passExceptChildren(pass)
    const classnames = props.classnames ? props.classnames.join(' ') : styles.defaultConstStyle
    return(
        <svg 
        key='viewbox' 
        alt='viewbox constant'
        width={props.width} 
        height={props.height}
        viewBox={props.viewBox}
        ref={props.svgref ? props.svgref : undefined}
        className={classnames}
        // css={[ (props.cssStyles ? props.cssStyles : undefined)]}
        >
        { propsToChildren }
        </svg>
    )
}

export { ViewBoxZoomPan, ViewBoxConst }

