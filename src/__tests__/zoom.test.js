import React from 'react';
import { mount, shallow } from '../enzyme';
import { useZoomPan } from '../zoom';
import { matchers } from 'jest-emotion'
import { HookWrapper, HookForceWrapper } from '@jadesrochers/reacthelpers'

expect.extend(matchers)

describe('useZoom hook tests', () => {

  test('Render a zoombutton set and click the in/out listeners ', () => {
    /* let wrapper = mount(<ZoomButtons */
    /*   zoomin={zoomin} zoomout={zoomout} */
    /* />) */ 

    let wrapper = shallow(<HookWrapper hook={() => useZoomPan(3, 0.4)}  />)
    /* console.log('ViewBoxZoomPan debug: ',wrapper.debug()) */
    let hook = wrapper.find('div').props().hook;
    expect(hook.scale).toEqual(1)
    expect(hook.shiftxpct).toEqual("0%")
    expect(hook.shiftypct).toEqual("0%")
    hook.zoomin()
    hook = wrapper.find('div').props().hook
    hook.zoomin()

    // check the default offset that keeps things centered as you zoom.
    hook = wrapper.find('div').props().hook
    expect(hook.scale).toEqual(1.4)
    expect(hook.shiftxpct).toEqual("-2%")
    expect(hook.shiftypct).toEqual("-2%")
    hook.pan({width: 100, height: 50}, 10, 5, true)

    hook = wrapper.find('div').props().hook
    expect(hook.shiftxpct).toEqual("8%")
    expect(hook.shiftypct).toEqual("8%")

    // The offsetlimit is 15% at scale(1.4), and this will run into that.
    hook.pan({width: 100, height: 50}, 20, 10, false)
    hook = wrapper.find('div').props().hook
    expect(hook.shiftxpct).toEqual("15%")
    expect(hook.shiftypct).toEqual("15%")

    // Since the last action set the end (false) this will
    // move from that end point.
    hook = wrapper.find('div').props().hook
    hook.pan({width: 100, height: 50}, -10, -5, true)

    hook = wrapper.find('div').props().hook
    expect(hook.shiftxpct).toEqual("5%")
    expect(hook.shiftypct).toEqual("5%")

    hook = wrapper.find('div').props().hook
    hook.zoomout()
    hook = wrapper.find('div').props().hook
    hook.zoomout()

    hook = wrapper.find('div').props().hook
    expect(hook.scale).toEqual(1)
    expect(hook.shiftxpct).toEqual("0%")
    expect(hook.shiftypct).toEqual("0%")

  });

})

