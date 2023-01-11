import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import PopUp from './PopUp'
import '@testing-library/jest-dom'

const images = []
const count = 5
const onRequestClose = jest.fn()

describe("popup test", () => {

    test("should render", () => {
        render(<PopUp images={images} count={count} onRequestClose={onRequestClose}/>)
    })

    test("should render popUp", () => {
        render(<PopUp images={images} count={count} onRequestClose={onRequestClose}/>)
        expect(screen.getByTestId("popup")).toBeInTheDocument()
    })

    test("should render popUp container", () => {
        render(<PopUp images={images} count={count} onRequestClose={onRequestClose}/>)
        expect(screen.getByTestId("popup_container")).toBeInTheDocument()
    })

    test("should excute funtion when buttom X is clicked", () => {
        render(<PopUp images={images} count={count} onRequestClose={onRequestClose}/>)
        const btn = screen.getByRole("button")
        fireEvent.click(btn)
        expect(onRequestClose).toBeCalled()
    })
})