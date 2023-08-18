import React from "react";
import styles from "./zoombutton.module.css";

// An open circle with a plus in it
const PlusCircle = (props) => {
  return(
    <svg 
      className={styles.symbolSvgDefaults}
      viewBox='-1 -1 125 125'>
      <circle 
      className={styles.plusCircleDefaults}
      strokeWidth="12" cx="60" cy="60" r="55" />
      <path 
      className={styles.plusPathFill}
      d="M55,55 v -35 h 10 v 35 h 35 v 10 h -35 v 35 h -10 v -35 h -35 v -10 h 35" />
    </svg>
  )
}

const MinusCircle = (props) => {
  return(
    <svg 
      className={styles.symbolSvgDefaults}
      viewBox='-1 -1 125 125'>
      <circle 
      className={styles.minusCircleDefaults}
      strokeWidth="12" cx="60" cy="60" r="55" />
      <path 
      className={styles.minusPathFill}
      d="M20,55 h 80 v 10 h -80 v -10" />
    </svg>
  )
}

// Expects a limitHook and resets it to a large range
/* width:'122px',height:'60px', */
const ZoomButtons = (props) => {
    const defaultClasses = `${styles.baseStyle} ${styles.activeState} ${styles.hoverCirc} ${styles.hoverPath}`
    const classNames = props.classnames ? `${props.classnames.join(' ')} ${defaultClasses}` : defaultClasses

  return(
   <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
       <button 
         onClick={() => {
           props.zoomin()
         } }
         className={classNames}
       >
         <PlusCircle />
       </button>
       <button 
         onClick={() => {
           props.zoomout()
         } }
         className={classNames}
       >
         <MinusCircle />
       </button>
   </div>
  )
}

export { ZoomButtons }
