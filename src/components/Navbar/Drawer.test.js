import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import Drawer from './Drawer'
import { BrowserRouter } from 'react-router-dom'


describe("Drawer test", () => {

    test("should render", () => {
        render(<BrowserRouter> <Drawer /> </BrowserRouter>)
    })

    test("should Render menu", () => {
        render(<BrowserRouter> <Drawer /> </BrowserRouter>)
        expect(screen.getByText("Menú")).toBeInTheDocument()
        
    })

    test("should excute funtion when buttom is clicked", () => {
        const closeDrawer = jest.fn()
        render(<BrowserRouter> <Drawer closeDrawer={closeDrawer}/> </BrowserRouter>)
        const btn = screen.getByRole("button")
        fireEvent.click(btn)
        expect(closeDrawer).toBeCalled()
    })
})

