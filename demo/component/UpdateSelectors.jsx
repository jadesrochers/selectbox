// This is possible because of a webpack resolve alias that points
// geomap to ../../src/index.js
import * as R from "ramda";
import { Form, RegSelector, UpdateSelector } from 'formbuilder'

const SampData = {
 2015: {
   jan: [2, 3, 4, 5],
   feb: [14, 15, 16, 17],
   mar: [1, 5, 11, 20, 25],
 },
 2016: {
   aug: [1,2,20,22],
   sept: [21,22,23,24],
   oct: [5,6,7,8],
 },
 2017: {
   mar: [11,12,13,14],
   june: [6,10,14,20],
   dec: [25,26,27,28,29,30,31],
 }
}

const handleFormSubmit = R.curry((pathfn,values,event) => {
  event.preventDefault();
  console.log(`Form values: ${values}`)
  window.alert(`Form values: ${values}`)
})

const TestUpdaters = (props) => {
  const datemap = SampData
  const years = R.keys(datemap)
  const month = R.keys(datemap[years[0]]).slice(-1)[0]
  const day = datemap[years[0]][month][0]
  console.log('year, month, day: ', years, month, day )
  const formSubmit = handleFormSubmit(props.pathFcn)
  return(
     <Form
       submitFormFcn = {formSubmit}
     >
       <RegSelector dataget={() => years} varname='year' defaultval={years[0]} />
       <UpdateSelector dataget={(vals) => R.keys(datemap[vals.year]) } varname='month' defaultval={month} changeon={['year']} />
       <UpdateSelector dataget={(vals) => datemap[vals.year][vals.month]} varname='day' defaultval={day} changeon={['year', 'month']}
/>
     </Form>
  )
}

export { TestUpdaters };
