import React from 'react';
import { render, screen, renderHook, act } from '@testing-library/react'
import { useMouseLocation, useMouseStatus, useMouseDownLocation, useMouseUpLocation, useMouseClickLocation, useMouseSelection, useSelectOffset} from '../selections'

describe('Location hook tests', () => {

    test('Test useMouseLocation', () => {
        const { result, rerender } = renderHook(() => useMouseLocation())
        expect(result.current.x).toEqual(0)
        expect(result.current.y).toEqual(0)

        // For useRef() Hooks, must use act() AND rerender() !!
        act(() => {
            result.current.mousemove(10, 15)
        })
        rerender()
        expect(result.current.x).toEqual(10)
        expect(result.current.y).toEqual(15)

        act(() => {
            result.current.mousemove(321, 511)
        })
        rerender()
        expect(result.current.x).toEqual(321)
        expect(result.current.y).toEqual(511)
    });

    test('Test useMouseStatus', () => {
        const { result } = renderHook(() => useMouseStatus())
        expect(result.current.ismousedown).toEqual(false)

        act(() => {
            result.current.setmousedown(true)
        })
        expect(result.current.ismousedown).toEqual(true)
    });

    test('Test useMouseDownLocation', () => {
        const { result } = renderHook(() => useMouseDownLocation())
        expect(result.current.startx).toEqual(0)
        expect(result.current.starty).toEqual(0)

        act(() => {
            result.current.mousedown(10, 15)
        })
        expect(result.current.startx).toEqual(10)
        expect(result.current.starty).toEqual(15)

        act(() => {
            result.current.mousedown(321, 511)
        })
        expect(result.current.startx).toEqual(321)
        expect(result.current.starty).toEqual(511)
    });

    test('Test useMouseUpLocation', () => {

        const { result } = renderHook(() => useMouseUpLocation())
        expect(result.current.endx).toEqual(0)
        expect(result.current.endy).toEqual(0)

        act(() => {
            result.current.mouseup(30, 20)
        })
        expect(result.current.endx).toEqual(30)
        expect(result.current.endy).toEqual(20)

        act(() => {
            result.current.mouseup(71, 202)
        })
        expect(result.current.endx).toEqual(71)
        expect(result.current.endy).toEqual(202)
    });

    test('Test useMouseClickLocation', () => {

        const { result } = renderHook(() => useMouseClickLocation())
        expect(result.current.clickx).toEqual(0)
        expect(result.current.clicky).toEqual(0)

        act(() => {
            result.current.mouseclick(10, 11)
        })
        expect(result.current.clickx).toEqual(10)
        expect(result.current.clicky).toEqual(11)

        act(() => {
            result.current.mouseclick(50, 51)
        })
        expect(result.current.clickx).toEqual(50)
        expect(result.current.clicky).toEqual(51)
    });

    test('Test useMouseSelection', () => {

        const { result } = renderHook(() => useMouseSelection())
        expect(result.current.selectx).toEqual(0)
        expect(result.current.selecty).toEqual(0)
        expect(result.current.dragx).toEqual(0)
        expect(result.current.dragy).toEqual(0)

        act(() => {
            result.current.setselection(true, 5, 6, 15, 16)
        })
        expect(result.current.selectx).toEqual(10)
        expect(result.current.selecty).toEqual(10)
        expect(result.current.dragx).toEqual(15)
        expect(result.current.dragy).toEqual(16)

        act(() => {
            result.current.setselection(true, 5, 6, 21, 35)
        })
        expect(result.current.selectx).toEqual(16)
        expect(result.current.selecty).toEqual(29)
        expect(result.current.dragx).toEqual(21)
        expect(result.current.dragy).toEqual(35)

        act(() => {
            result.current.setselection(false, 5, 6, 21, 35)
        })
        expect(result.current.selectx).toEqual(16)
        expect(result.current.selecty).toEqual(29)
        expect(result.current.dragx).toEqual(21)
        expect(result.current.dragy).toEqual(35)
    });

    test('Test useSelectOffset', () => {

        const { result, rerender } = renderHook(() => useSelectOffset())
        expect(result.current.offx).toEqual(0)
        expect(result.current.offy).toEqual(0)

        // For useRef() Hooks, must use act() AND rerender() !!
        act(() => {
            result.current.setoff(true, 15, 16, 25, 26)
        })
        rerender()
        expect(result.current.offx).toEqual(15)
        expect(result.current.offy).toEqual(16)

        act(() => {
            result.current.setoff(true, 15, 16, 9, 11)
        })
        rerender()
        expect(result.current.offx).toEqual(9)
        expect(result.current.offy).toEqual(11)

        act(() => {
            result.current.setoff(false, 5, 6, 21, 35)
        })
        rerender()
        expect(result.current.offx).toEqual(9)
        expect(result.current.offy).toEqual(11)
    });

})


