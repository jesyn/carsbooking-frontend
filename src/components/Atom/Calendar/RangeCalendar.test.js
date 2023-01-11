import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import RangeCalendar from './RangeCalendar'
import '@testing-library/jest-dom'

const setShowCalendar= jest.fn()

describe("Range Calendar test", () => {
    
    test("should Render", () => {
        render(<RangeCalendar />)
    })

    test("should render calendar container", () => {
        render(<RangeCalendar />)
        expect(screen.getByTestId("calendar_container")).toBeInTheDocument()
    })

    test("should render calendar container input", () => {
        render(<RangeCalendar />)
        expect(screen.getByTestId("calendar_input_container")).toBeInTheDocument()
    })

    test("should render calendar input date", () => {
        render(<RangeCalendar />)
        expect(screen.getByTestId("calendar_input_date")).toBeInTheDocument()
    })

    test("should render calendar icon date", () => {
        render(<RangeCalendar />)
        expect(screen.getByTestId("calendar_icon_date")).toBeInTheDocument()
    })

    test("should render buttom", () => {
        render(<RangeCalendar />)
        const input = screen.getByRole("input")
        fireEvent.focus(input)
        expect(screen.getByRole("aplicar")).toBeInTheDocument()
    })

    test("should excute funtion when buttom is clicked", () => { //no funciona
        render(<RangeCalendar />)
        const btn = screen.getByRole("button")
        fireEvent.click(btn)
        expect(setShowCalendar).toBeCalled()
    })
})