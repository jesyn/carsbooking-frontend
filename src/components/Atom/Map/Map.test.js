import React from 'react'
import {render, screen} from '@testing-library/react'
import Map from './Map'
import '@testing-library/jest-dom'

const location = ""

describe("Map test", ()=> {
    
    test("should Render", () => {
        render(<Map location={location}/>)
    })

    test("should render map container", () => {
        render(<Map location={location}/>)
        expect(screen.getByTestId("map_container")).toBeInTheDocument()
    })
})