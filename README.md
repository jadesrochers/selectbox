## SelectBox; a package for setting up user interaction, svg  
This package handles adding in support for mouse/touch movement  
and passing useful information about it to children.  
It also handles display/presentation for svg since they often go together.  

#### There are two main components; the SelectBase and ViewBox   
SelectBase component tracks all mouse/touch movement and passes  
that information to child components.  
Viewbox comes in Const and ZoomPan flavors, it sets up and SVG element,  
and then the flavor determines if zoom/pan is possible or not.  

#### Setting up the SelectBase -  
It sets up a div that will track all mouse/touch movement inside.  
The arguments are all optional.  
```javascript
import { ViewBoxZoomPan, ViewBoxConst } from '@jadesrochers/selectbox'

const Test = (props) => {
   return(
      <SelectBase
        width="50vh"
        height="80vh"
        cssStyles={{
          backgroundColor: "#a5a4e7",
          display: "flex",
          justifyContent: "start",
          flexDirection: "row",
          border: "2px solid #565656"
        }}
      >
         <Components with access to points variables > 
      </SelectBase>
   )
}
```
SelectBase will pass pointer variables to direct children, and you can  
access them/pass them from there as needed.  
#### Pointer variables passed by SelectBase -  
1. ismousedown - indicates if the mouse is down.  
2. x - Pointer x location.  
3. y - Pointer y location.  
4. startx - Anytime onMouseDown/onTouchStart event occurs, sets x location.  
5. starty - When onMouseDown/onTouchStart event occurs, set y location.  
6. endx - when onMouseUp/onTouchEnd event occurs, set x location.  
7. endy - when mouseup/touchend occurs, set y location.  
8. clickx - when onClick event occurs, set x location.  
9. clicky - when onClick occurs, set y location.  
10. selectx - With pointer down/moving, tracks startx to current x distance.  
11. selecty - With pointer down/moving, tracks starty to current y distance.  
12. dragx - When pointer is down, tracks current x location.  
13. dragy - When pointer is down, tracks current y location.  
14. offx - when mouse is down, track selection area x offset.  
15. offy - When mouse is down, track selection area y offset.  
16. trackBounds - Tracks width, height of element, top/left offsets. Only  
has values when using `<MouseRect>` or when you set it manually.  

**Interactive illustration of how these vars work -**
It shows the values of all variables SelectBase passes to children.  
[Check out a demonstration sandbox](https://codesandbox.io/s/select-zoom-pan-demo-vjxgi)

#### Setting up SVG viewboxes   
selectbox exports two options; one supports zooming and panning, the other  
is fixed/constant.  
#### The important feature is that the viewbox maintains svg scale -  
The viewboxes use the viewbox feature of SVG to keep their contents scaled  
no matter how the svg changes in size.   
If you don't want the svg to scale, then just make the ViewBox size fixed.  
#### Getting viewboxes set up   
The size of the viewbox and the x/y arguments to the viewBox parameter don't  
need to match; the point is to detach content sizing from display sizing.  
```javascript
import { ViewBoxZoomPan, ViewBoxConst } from '@jadesrochers/selectbox'

const Test = (props) => {
  const xsize = 300;
  const ysize = 200;
   return(
        <ViewBoxZoomPan
          key="viewbox"
          width={"250px"}
          height={"150px"}
          viewBox={`0 0 ${xsize} ${ysize}`}
        >
          <MouseRect width="100%" height="100%" />
          <SvgContents />
        </ViewBoxZoomPan>

        <ViewBoxConst
          key="viewbox"
          width={"100%"}
          height={"100%"}
          viewBox={`0 0 ${xsize} ${ysize}`}
        >
          <SvgContents />
        </ViewBoxZoomPan>

   )
}
```
**Codesandboxes showing the ZoomPan and Const variants -**
[Zoom and pan the svg](https://codesandbox.io/s/select-zoom-pan-demo-vjxgi)
[Svg cannot zoom/pan, but still scales if size changes](https://codesandbox.io/s/selectbox-animation-demo-0fozk)


#### Making select and viewbox work together requires coordination   
To make sure that the pointer variables will scale correctly and match  
the svg if it changes size, you need to pass arguments to each letting them  
know what this size is.  
You also need a <MouseRect/> which will useRef to track  
actual size for scaling.  
#### Make sure xsize/ysize set, and include MouseRect -  
Both the SelectBase and ViewBox need the xsize/ysize vars, and the  
ViewBox must have the MouseRect in it to track sizing so the elements  
can scale correctly.  
```javascript
import { SelectBase, MouseRect, ViewBoxZoomPan } from "@jadesrochers/selectbox";
const SelectTest = props => {
  const xsize = 240;
  const ysize = 380;
  return(
     <SelectBase
        width="50vh"
        height="80vh"
        sizex={xsize}
        sizey={ysize}
        cssStyles={{
          backgroundColor: "#a5a4e7",
          display: "flex",
          justifyContent: "start",
          flexDirection: "row",
          border: "2px solid #565656"
        }}
        {...pass}
      >
        <ViewBoxZoomPan
          key="viewbox"
          width={"100%"}
          height={"100%"}
          viewBox={`0 0 ${xsize} ${ysize}`}
        >
          <MouseRect width="100%" height="100%" />
          <SelectDemo />
        </ViewBoxZoomPan>
      </SelectBase>
      <ZoomButtons {...pass} />
  )
```
#### Most args are not required -  
The style arguments are just examples.  
The required arguments are viewBox for the viewBox and sizex/sizey  
for the selectBase.  
Mouserect does not need to be same size as viewbox, but it needs to have  
x and y dimensions, and should be large so scaling is accurate.  

#### zoom   
If you want zoom to work, the useZoom hook needs to be used, and then  
some component needs to be able to call zoomin/zoomout, which I have a  
built in ZoomButton component for.  
#### The useZoom hook also needs the x/y sizing -  
It needs it correctly calculate panning, zooming in or out.  
The variables returned by useZoomPan need to be passed to the SelectBase and  
the ZoomButtons.  
```javascript
const SelectTest = props => {
  const xsize = 240;
  const ysize = 380;
  const { scale, zoomin, zoomout, pan, shiftxpct, shiftypct } = useZoomPan(
    3.0,
    1.0,
    xsize,
    ysize
  );
  let pass = {
    zoomin: zoomin,
    pan: pan,
    scale: scale,
    zoomout: zoomout,
    shiftxpct: shiftxpct,
    shiftypct: shiftypct
  };
  return (
      <SelectBase
        sizex={xsize}
        sizey={ysize}
        {...pass}
      >
        <ViewBoxZoomPan
          key="viewbox"
          width={"100%"}
          height={"100%"}
          viewBox={`0 0 ${xsize} ${ysize}`}
        >
          <MouseRect width="100%" height="100%" />
          <SelectDemo />
        </ViewBoxZoomPan>
      </SelectBase>
      <ZoomButtons {...pass} />
    </div>
  );
};
```

#### Selection rectangles can be drawn based on pointer movements   
These are just a few components I put together for highlighting selections.  
They go inside a ViewBox within a Selectbase and highlight based on  
different pointer paramters.  
```javascript
import { SelectXRect, SelectYRect, SelectXYRect } from "@jadesrochers/selectbox"
const TestSelect = (props) => {
  return(
  <SelectBase
        sizex={250}
        sizey={400}
  >
    <ViewBoxConst
      key="viewbox"
      viewBox={"0 0 250 420"}
      cssStyles={{
        outline: "2px solid #1b2477"
      }}
    >
      <SelectXRect height="100px" cssStyles={{ fill: "red" }} />
      <SelectYRect width="100px" cssStyles={{ fill: "green" }} />
      <SelectXYRect cssStyles={{ fill: "blue" }} />
    </ViewBoxConst>
  </SelectBase>
  )
}
```

#### Demo and code for this -  
[Demo the selection Rectangles](https://codesandbox.io/s/selectbox-rectangles-d40c4)

