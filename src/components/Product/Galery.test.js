import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import Galery from './Galery'
import '@testing-library/jest-dom'

const carPortrait = ""
const carImages= []
const togglePopUp= jest.fn()


describe("Galery test", ()=> {
    
    test("should Render", () => {
        render(<Galery carImages={carImages} carPortrait={carPortrait}/>)
    })
    
    test("should render Galery container", () => {
        render(<Galery carImages={carImages} carPortrait={carPortrait}/>)
        expect(screen.getByTestId("galery_container")).toBeInTheDocument()
    })
    
    test("should render galery mobile", () => {
        render(<Galery carImages={carImages} carPortrait={carPortrait}/>)
        expect(screen.getByTestId("galery_mobile")).toBeInTheDocument()
    })

    test("should render Galery desktop", () => {
        render(<Galery carImages={carImages} carPortrait={carPortrait}/>)
        expect(screen.getByTestId("galery_desktop")).toBeInTheDocument()
    })

    test("should render portrait container", () => {
        render(<Galery carImages={carImages} carPortrait={carPortrait}/>)
        expect(screen.getByTestId("portrait_container")).toBeInTheDocument()
    })

    test("should render images desktop", () => {
        render(<Galery carImages={carImages} carPortrait={carPortrait}/>)
        expect(screen.getByTestId("images_desktop")).toBeInTheDocument()
    })

    test("should excute funtion when buttom is clicked", () => {
        render(<Galery carImages={carImages} carPortrait={carPortrait}/>)
        const btn = screen.getByRole("button")
        fireEvent.click(btn)
        expect(togglePopUp).toBeCalled()
    })

})