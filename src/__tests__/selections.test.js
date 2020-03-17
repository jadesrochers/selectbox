import React from 'react';
import { shallow, mount } from '../enzyme';
import { useMouseLocation, useMouseStatus, useMouseDownLocation, useMouseUpLocation, useMouseClickLocation, useMouseSelection, useSelectOffset} from '../selections'
import { HookWrapper, HookForceWrapper } from '@jadesrochers/reacthelpers'
import { act } from 'react-dom/test-utils';

describe('Location hook tests', () => {

  test('Test useMouseLocation', () => {
 
    // HookForceWrapper uses a dummy state var to force updates
    // Use this when the hooks uses Refs to track some variables,
    // because they will not result in updates.  
    let wrapper = mount(<HookForceWrapper  hook={() => useMouseLocation()}  />) 
    let hook = wrapper.find('div').props().hook;
    console.log('wrapper.debug() for hookforcewrapper: ', wrapper.debug())
    let update = wrapper.find('j').props().forceupdate;
    expect(hook.x).toEqual(0)
    expect(hook.y).toEqual(0)
    hook.mousemove(10, 15)

    act(() => {
      update(1)
    })
    wrapper.update()

    hook = wrapper.find('div').props().hook
    expect(hook.x).toEqual(10)
    expect(hook.y).toEqual(15)
    hook.mousemove(321, 511)

    hook = wrapper.find('div').props().hook
    expect(hook.x).toEqual(10)
    expect(hook.y).toEqual(15)
   });

  test('Test useMouseStatus', () => {

    // the wrapping function for the hook is so that args can be 
    // passed to initialize if needed. Did not need to here.
    let wrapper = shallow(<HookWrapper hook={() => useMouseStatus()}  />) 
    let hook = wrapper.find('div').props().hook;
    /* console.log('wrapper.debug() for hookwrapper: ', wrapper.debug()) */
    /* console.log('hook content: ',hook) */
    expect(hook.ismousedown).toEqual(false)

    hook.setmousedown(true)
    hook = wrapper.find('div').props().hook
    expect(hook.ismousedown).toEqual(true)
   });

  test('Test useMouseDownLocation', () => {

    let wrapper = shallow(<HookWrapper hook={() => useMouseDownLocation()}  />) 
    let hook = wrapper.find('div').props().hook;
    expect(hook.startx).toEqual(0)
    expect(hook.starty).toEqual(0)
    hook.mousedown(10, 15)

    hook = wrapper.find('div').props().hook
    expect(hook.startx).toEqual(10)
    expect(hook.starty).toEqual(15)
    hook.mousedown(321, 511)

    hook = wrapper.find('div').props().hook
    expect(hook.startx).toEqual(321)
    expect(hook.starty).toEqual(511)
   });

  test('Test useMouseUpLocation', () => {

    let wrapper = shallow(<HookWrapper hook={() => useMouseUpLocation()}  />) 
    let hook = wrapper.find('div').props().hook;
    expect(hook.endx).toEqual(0)
    expect(hook.endy).toEqual(0)
    hook.mouseup(30, 20)

    hook = wrapper.find('div').props().hook
    expect(hook.endx).toEqual(30)
    expect(hook.endy).toEqual(20)
    hook.mouseup(71, 202)

    hook = wrapper.find('div').props().hook
    expect(hook.endx).toEqual(71)
    expect(hook.endy).toEqual(202)
   });

  test('Test useMouseClickLocation', () => {

    let wrapper = shallow(<HookWrapper hook={() => useMouseClickLocation()}  />) 
    let hook = wrapper.find('div').props().hook;
    expect(hook.clickx).toEqual(0)
    expect(hook.clicky).toEqual(0)
    hook.mouseclick(10, 11)

    hook = wrapper.find('div').props().hook
    expect(hook.clickx).toEqual(10)
    expect(hook.clicky).toEqual(11)
    hook.mouseclick(50, 51)

    hook = wrapper.find('div').props().hook
    expect(hook.clickx).toEqual(50)
    expect(hook.clicky).toEqual(51)
   });

  test('Test useMouseSelection', () => {

    let wrapper = shallow(<HookWrapper hook={() => useMouseSelection()}  />)
    let hook = wrapper.find('div').props().hook;
    expect(hook.selectx).toEqual(0)
    expect(hook.selecty).toEqual(0)
    expect(hook.dragx).toEqual(0)
    expect(hook.dragy).toEqual(0)
    hook.setselection(true, 5, 6, 15, 16)

    hook = wrapper.find('div').props().hook
    expect(hook.selectx).toEqual(10)
    expect(hook.selecty).toEqual(10)
    expect(hook.dragx).toEqual(15)
    expect(hook.dragy).toEqual(16)
    hook.setselection(true, 5, 6, 21, 35)

    hook = wrapper.find('div').props().hook
    expect(hook.selectx).toEqual(16)
    expect(hook.selecty).toEqual(29)
    expect(hook.dragx).toEqual(21)
    expect(hook.dragy).toEqual(35)
    hook.setselection(false, 5, 6, 21, 35)

    hook = wrapper.find('div').props().hook
    expect(hook.selectx).toEqual(16)
    expect(hook.selecty).toEqual(29)
    expect(hook.dragx).toEqual(21)
    expect(hook.dragy).toEqual(35)
   });

  test('Test useSelectOffset', () => {

    let wrapper = mount(<HookForceWrapper hook={() => useSelectOffset()}  />) 
    let hook = wrapper.find('div').props().hook;
    let update = wrapper.find('j').props().forceupdate;

    expect(hook.offx).toEqual(0)
    expect(hook.offy).toEqual(0)
    hook.setoff(true, 15, 16, 25, 26)

    act(() => {
      update(1)
    })
    wrapper.update()

    hook = wrapper.find('div').props().hook
    expect(hook.offx).toEqual(15)
    expect(hook.offy).toEqual(16)
    hook.setoff(true, 15, 16, 9, 11)

    act(() => {
      update(2)
    })
    wrapper.update()

    hook = wrapper.find('div').props().hook
    expect(hook.offx).toEqual(9)
    expect(hook.offy).toEqual(11)
    hook.setoff(false, 5, 6, 21, 35)

    act(() => {
      update(3)
    })
    wrapper.update()

    hook = wrapper.find('div').props().hook
    expect(hook.offx).toEqual(9)
    expect(hook.offy).toEqual(11)

   });

})


