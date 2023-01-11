import React from 'react'
import {render, screen} from '@testing-library/react'
import NotFound from './NotFound'
import '@testing-library/jest-dom'


describe("not Found test", ()=> {
    
    test("should Render", () => {
        render(<NotFound />)
    })

    test("should said página no encontrada", () => {
        render(<NotFound />)
        expect(screen.getByRole("error_text")).toHaveTextContent("página no encontrada")
    })

    test("should render container", () => {
        render(<NotFound />)
        expect(screen.getByTestId("notFound_container")).toBeInTheDocument()
    })

})