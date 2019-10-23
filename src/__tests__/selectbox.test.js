import React from 'react';
import * as R from 'ramda';
import { mount } from '../enzyme';
import { act } from 'react-dom/test-utils';
import { matchers } from 'jest-emotion'
import { SelectBase, SelectXYRect, SetBarxLimits, SelectXRect } from '../../selectbox'
import { SvgWrapper } from '@jadesrochers/reacthelpers'

// Adds emotion matcher directly to jest.
expect.extend(matchers)

describe('SelectBase tests', () => {
  test('Create a selectbase with a selectXYrect inside and move around', () => {
    let wrapper = mount( 
      <SelectBase key='selectbox' width={100} height={100}>
        <SvgWrapper key='svgwrap'>
          <SelectXYRect key='selectxy' /> 
        </SvgWrapper>
      </SelectBase>
      ) 


    let mousedown = wrapper.find('div').props().onMouseDown;
    let fakee = { clientX: 25, clientY: 25 }
    act(() => {
      mousedown(fakee)
    })
    wrapper.update()

    let mousemove = wrapper.find('div').props().onMouseMove;
    act(() => {
      mousemove({clientX: 50, clientY: 50})
    })
    wrapper.update()
    /* console.log('Updated wrapper 1: ',wrapper.debug()) */
    expect(wrapper.find('rect').containsMatchingElement(
      <rect width={25} height={25} />)
    ).toBeTruthy()
    expect(wrapper.find('rect')).toHaveStyleRule("transform","translate(25px,25px)") 
    

    mousemove = wrapper.find('div').props().onMouseMove;
    act(() => {
      mousemove({clientX: 75, clientY: 75})
    })
    wrapper.update()

    expect(wrapper.find('rect').containsMatchingElement(
      <rect width={50} height={50} />)
    ).toBeTruthy()
    expect(wrapper.find('rect')).toHaveStyleRule("transform","translate(25px,25px)") 

    mousemove = wrapper.find('div').props().onMouseMove;
    act(() => {
      mousemove({clientX: 10, clientY: 10})
    })
    wrapper.update()

    expect(wrapper.find('rect').containsMatchingElement(
      <rect width={15} height={15} />)
    ).toBeTruthy()
    expect(wrapper.find('rect')).toHaveStyleRule("transform","translate(10px,10px)") 

  });

  test('Use a selectbase with a selectXrect', () => {
    let wrapper = mount( 
      <SelectBase key='selectbox' width={100} height={100}>
        <SvgWrapper key='svgwrap'>
          <SelectXRect key='selectxy' height={100} /> 
        </SvgWrapper>
      </SelectBase>
      ) 


    let mousedown = wrapper.find('div').props().onMouseDown;
    let fakee = { clientX: 25, clientY: 25 }
    act(() => {
      mousedown(fakee)
    })
    wrapper.update()

    let mousemove = wrapper.find('div').props().onMouseMove;
    act(() => {
      mousemove({clientX: 50, clientY: 50})
    })
    wrapper.update()
    /* console.log('Updated wrapper 1: ',wrapper.debug()) */
    expect(wrapper.find('rect').containsMatchingElement(
      <rect width={25} height={100} />)
    ).toBeTruthy()
    expect(wrapper.find('rect')).toHaveStyleRule("transform","translate(25px,0px)") 
    

    mousemove = wrapper.find('div').props().onMouseMove;
    act(() => {
      mousemove({clientX: 75, clientY: 75})
    })
    wrapper.update()

    expect(wrapper.find('rect').containsMatchingElement(
      <rect width={50} height={100} />)
    ).toBeTruthy()
    expect(wrapper.find('rect')).toHaveStyleRule("transform","translate(25px,0px)") 

    mousemove = wrapper.find('div').props().onMouseMove;
    act(() => {
      mousemove({clientX: 10, clientY: 10})
    })
    wrapper.update()

    expect(wrapper.find('rect').containsMatchingElement(
      <rect width={15} height={100} />)
    ).toBeTruthy()
    expect(wrapper.find('rect')).toHaveStyleRule("transform","translate(10px,0px)") 

  });


  test('Use selectbase with x limit setter', () => {
    let limitcall = jest.fn()
    let limitHook = {setLimits: jest.fn(R.curry((a,b) => limitcall(a,b)))}
    let plotData = [[10,30],[30,50],[50,70],[70,90]]
    let wrapper = mount(
        <SelectBase key='selectbox' width={100} height={100} >
          <SetBarxLimits key='limitsetter' limitHook={limitHook} 
           plotData={plotData} 
          > 
          </SetBarxLimits>
        </SelectBase>
      )

    let mousemove, mousedown, mouseup
    mousedown = wrapper.find('div').props().onMouseDown;

    let fakee = { clientX: 35, clientY: 45 }
    act(() => {
      mousedown(fakee)
    })
    wrapper.update()

    mousemove = wrapper.find('div').props().onMouseMove;
    act(() => {
      mousemove({clientX: 55, clientY: 60})
    })
    wrapper.update()
    /* console.log('Updated wrapper 1: ',wrapper.debug()) */

    mouseup = wrapper.find('svg').props().onMouseUp;
    act(() => {
      mouseup()
    })

    expect(limitcall).toHaveBeenCalledWith('x', [30, 50])
  });
})


