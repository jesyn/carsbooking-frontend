import React from 'react'
import {render, screen} from '@testing-library/react'
import Carousel from './Carousel'
import '@testing-library/jest-dom'

const images =[]
const count= 5


describe("Carousel test", ()=> {
    
    test("should Render", () => {
        render(<Carousel images={images} count={count} />)
    })

    
    test("should render Carousel", () => {
        render(<Carousel images={images} count={count}/>)
        expect(screen.getByTestId("carousel_container")).toBeInTheDocument()
    })

})