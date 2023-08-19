import React from 'react';
import { render, screen, renderHook, act } from '@testing-library/react'
import { useZoomPan } from '../zoom';
import { HookWrapper, HookForceWrapper } from '@jadesrochers/reacthelpers'


describe('useZoom hook tests', () => {

    test('Render a zoombutton set and click the in/out listeners ', () => {
        /* let wrapper = mount(<ZoomButtons */
        /*   zoomin={zoomin} zoomout={zoomout} */
        /* />) */ 

        const { result } = renderHook(() => useZoomPan())
        expect(result.current.scale).toEqual(1)
        expect(result.current.shiftxpct).toEqual("0%")
        expect(result.current.shiftypct).toEqual("0%")

        act(() => {
            result.current.zoomin()
        })
        act(() => {
            result.current.zoomin()
        })
        // check the default offset that keeps things centered as you zoom.
        expect(result.current.scale).toEqual(1.4)
        expect(result.current.shiftxpct).toEqual("-0.8%")
        expect(result.current.shiftypct).toEqual("-0.8%")

        act(() => {
            result.current.pan(10, 5, true)
        })
        expect(result.current.shiftxpct).toEqual("6%")
        expect(result.current.shiftypct).toEqual("2%")

        // The offsetlimit is 15% at scale(1.4), and this will run into that.
        act(() => {
            result.current.pan(20, 10, false)
        })
        expect(result.current.shiftxpct).toEqual("13%")
        expect(result.current.shiftypct).toEqual("6%")

        // Since the last action set the end (false) this will
        // move from that end point.
        act(() => {
            result.current.pan(-10, -5, true)
        })
        expect(result.current.shiftxpct).toEqual("5%")
        expect(result.current.shiftypct).toEqual("2%")

        act(() => {
            result.current.zoomout()
        })
        act(() => {
            result.current.zoomout()
        })
        expect(result.current.scale).toEqual(1)
        expect(result.current.shiftxpct).toEqual("0%")
        expect(result.current.shiftypct).toEqual("0%")

    });

})


