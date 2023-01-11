import React from 'react'
import {render, screen} from '@testing-library/react'
import Spinner from './Spinner'
import '@testing-library/jest-dom'


describe("spinner test", ()=> {
    
    test("should Render", () => {
        render(<Spinner />)
    })


    test("should render container", () => {
        render(<Spinner />)
        expect(screen.getByTestId("spinner_container")).toBeInTheDocument()
    })

})