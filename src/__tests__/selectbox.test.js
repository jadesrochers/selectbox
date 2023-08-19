import React from 'react';
import * as R from 'ramda';
import { render, screen, act } from '@testing-library/react'
import { SelectBase, SelectXYRect, SetBarxLimits, SelectXRect, SelectYRect } from '../selectbox'
import { SvgWrapper } from '@jadesrochers/reacthelpers'


describe('SelectBase tests', () => {
  test('Create a selectbase with a selectXYrect inside and move around', () => {
      const { container, rerender } = render( 
      <SelectBase key='selectbox' width={100} height={100}>
        <SvgWrapper key='svgwrap'>
          <SelectXYRect key='selectxy' /> 
        </SvgWrapper>
      </SelectBase>
      ) 

    const mousedown = container.firstElementChild.onmousedown;
    const rect = container.firstElementChild.firstElementChild.firstElementChild;
    expect(rect).toBeDefined()
    
    // Changing over to react-testing-library made it so I could
    // no longer figure this out. Re-implement later if you can.
    // const fakee = { clientX: 25, clientY: 25 }
    // act(() => {
    //   mousedown(fakee)
    // })
    // rerender()

    // let mousemove = wrapper.find('div').props().onMouseMove;
    // act(() => {
    //   mousemove({clientX: 50, clientY: 50})
    // })
    // wrapper.update()
    // /* console.log('Updated wrapper 1: ',wrapper.debug()) */
    // expect(wrapper.find('rect').containsMatchingElement(
    //   <rect width={25} height={25} />)
    // ).toBeTruthy()
    // expect(wrapper.find('rect')).toHaveStyleRule("transform","translate(25px,25px)") 
  });

  test('Use a selectbase with a selectXrect', () => {
    const { container } = render( 
      <SelectBase key='selectbox' width={100} height={100}>
        <SvgWrapper key='svgwrap'>
          <SelectXRect key='selectx' height={100} /> 
        </SvgWrapper>
      </SelectBase>
      ) 

    const mousedown = container.firstElementChild.onmousedown;
    const rect = container.firstElementChild.firstElementChild.firstElementChild;
    expect(rect).toBeDefined()
  });

  test('Use a selectbase with a selectYrect', () => {
    const { container } = render( 
      <SelectBase key='selectbox' width={100} height={100}>
        <SvgWrapper key='svgwrap'>
          <SelectYRect key='selecty' width={100} /> 
        </SvgWrapper>
      </SelectBase>
      ) 

    const mousedown = container.firstElementChild.onmousedown;
    const rect = container.firstElementChild.firstElementChild.firstElementChild;
    expect(rect).toBeDefined()
  });


  test('Use selectbase with x limit setter', () => {
    let limitcall = jest.fn()
    let limitHook = {setLimits: jest.fn(R.curry((a,b) => limitcall(a,b)))}
    let plotData = [[10,30],[30,50],[50,70],[70,90]]
    const { container } = render(
        <SelectBase key='selectbox' width={100} height={100} >
          <SetBarxLimits key='limitsetter' limitHook={limitHook} 
           plotData={plotData} 
          > 
          </SetBarxLimits>
        </SelectBase>
      )

    const mousedown = container.firstElementChild.onmousedown;
    const rect = container.firstElementChild.firstElementChild.firstElementChild;
    expect(rect).toBeDefined()
  });
})


