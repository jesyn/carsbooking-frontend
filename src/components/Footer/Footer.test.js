import React from 'react'
import {render, screen} from '@testing-library/react'
import Footer from './Footer'
import '@testing-library/jest-dom'


describe("footer test", ()=> {
    
    test("should Render", () => {
        render(<Footer />)
    })

    test("should said ©2022 Digital Booking at the left", () => {
        render(<Footer />)
        expect(screen.getByRole("copy_right")).toHaveTextContent("©2022 Digital Booking")
    })

    test("should render container", () => {
        render(<Footer />)
        expect(screen.getByTestId("footer_container")).toBeInTheDocument()
    })

    test("should render icons", () => {
        render(<Footer />)
        expect(screen.getByTestId("icons")).toBeInTheDocument()
    })
})