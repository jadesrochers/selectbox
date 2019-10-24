import React from 'react';
import { mount } from '../enzyme';
import { ViewBoxZoomPan, ViewBoxConst } from '../viewbox';
import { matchers } from 'jest-emotion'

expect.extend(matchers)


describe('Viewbox tests', () => {
  test('Render a ViewBoxZoomPan ', () => {
    let wrapper = mount(<ViewBoxZoomPan viewBox='0 0 500 300' 
     width={200} height={140}
     pan={jest.fn()} trackBounds={0} x={1} startx={2}
     y={3} starty={4} ismousedown={false} dragx={5} dragy={6}
     scale={1.5} shiftxpct={'30%'} shiftypct={'20%'}
    />) 
    /* console.log('ViewBoxZoomPan debug: ',wrapper.debug()) */
    expect(wrapper.find('svg').props().viewBox).toEqual("0 0 500 300")
    expect(wrapper.find('svg')).toHaveStyleRule("transform","scale(1.5) translate(30%,20%)")

  });

  test('Render a ViewBoxConst ', () => {
    let wrapper = mount(<ViewBoxConst viewBox='0 0 500 300' 
     width={200} height={140}
    />) 
    
    expect(wrapper.find('svg').props().viewBox).toEqual("0 0 500 300")

  });

})


