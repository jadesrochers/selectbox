import React from 'react';
import { ViewBoxZoomPan, ViewBoxConst } from '../viewbox';
import { render, screen } from '@testing-library/react'


describe('Viewbox tests', () => {
    test('Render a ViewBoxZoomPan ', () => {
        const { container } = render(<ViewBoxZoomPan viewBox='0 0 500 300' 
            width={200} height={140}
            pan={jest.fn()} trackBounds={0} x={1} startx={2}
            y={3} starty={4} ismousedown={false} dragx={5} dragy={6}
            scale={1.5} shiftxpct={'30%'} shiftypct={'20%'}
            />) 
        const svg = container.firstElementChild
        expect(svg.getAttribute("alt")).toEqual("viewbox zoom pan")
        expect(svg.getAttribute("width")).toEqual("200")
        expect(svg.getAttribute("height")).toEqual("140")
        expect(svg.getAttribute("viewBox")).toEqual("0 0 500 300")
    });

    test('Render a ViewBoxConst ', () => {
        const { container } = render(<ViewBoxConst viewBox='0 0 500 300' width={200} height={140} />) 
        const svg = container.firstElementChild
        expect(svg.getAttribute("alt")).toEqual("viewbox constant")
        expect(svg.getAttribute("width")).toEqual("200")
        expect(svg.getAttribute("height")).toEqual("140")
        expect(svg.getAttribute("viewBox")).toEqual("0 0 500 300")
    });

})


