import React from 'react'
import {render, screen} from '@testing-library/react'
import Caracteristics from './Caracteristics'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'

const carTopics = [ {
    "id": 1,
    "characteristic": "Bluetooth",
    "url_icon": "fa-solid fa-check"
}]

describe("Caracteristics test", ()=> {
    
    test("should Render", () => {
        render(<Caracteristics carTopics={carTopics}/>)
    })
    
    test("should render items container", () => {
        render(<Caracteristics carTopics={carTopics}/>)
        expect(screen.getByTestId("items_container")).toBeInTheDocument()
    })

    test("should said Prestaciones", () => {
        render(<BrowserRouter> <Caracteristics carTopics={carTopics}/> </BrowserRouter>)
        expect(screen.getByText("Prestaciones")).toBeInTheDocument()
        
    })

    test("should render line", () => {
        render(<Caracteristics carTopics={carTopics}/>)
        expect(screen.getByTestId("line")).toBeInTheDocument()
    })

    test("should render list container", () => {
        render(<Caracteristics carTopics={carTopics}/>)
        expect(screen.getByTestId("list_container")).toBeInTheDocument()
    })

    test("should render list", () => {
        render(<Caracteristics carTopics={carTopics}/>)
        expect(screen.getByTestId("list")).toBeInTheDocument()
    })

})