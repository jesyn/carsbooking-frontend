import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import Cards from './Card'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'

const carsSelected= [{
    "id": 1,
    "portada_url":"https://media.discordapp.net/attachments/1031733711194046469/1032704738749333656/unknown.png",
    "category":{
        "category": "Classic"
    },
    "city": {
        "city": "mendoza"
    },
    "brand":"Ford",
    "model": "Fiesta 2020",
    "location": "Buenos Aires",
    "description": "Un auto cómodo y accesible para recorrer los mejores puntos turísticos."
    }]
const title= "titulo prueba"


describe("Cards test", ()=> {
    
    test("should Render", () => {
        render(<BrowserRouter> <Cards carsSelected={carsSelected} title={title}/> </BrowserRouter>)
    })

    
    test("should render Cards container", () => {
        render(<BrowserRouter> <Cards carsSelected={carsSelected} title={title}/> </BrowserRouter>)
        expect(screen.getByTestId("cards_container")).toBeInTheDocument()
    })

    test("should render title container", () => {
        render(<BrowserRouter> <Cards carsSelected={carsSelected} title={title}/> </BrowserRouter>)
        expect(screen.getByTestId("title_container")).toBeInTheDocument()
    })

    test("should render cards section", () => {
        render(<BrowserRouter> <Cards carsSelected={carsSelected} title={title}/> </BrowserRouter>)
        expect(screen.getByTestId("cards_section")).toBeInTheDocument()
    })

    test("should render Card", () => {
        render(<BrowserRouter> <Cards carsSelected={carsSelected} title={title}/> </BrowserRouter>)
        expect(screen.getByTestId("card")).toBeInTheDocument()
    })

    test("should render button", () => { //NO FUNCIONA
        render(<BrowserRouter> <Cards carsSelected={carsSelected} title={title}/> </BrowserRouter>)
        const btn = screen.getByRole("button")
        fireEvent.click(btn)
        expect(screen.getByRole("ver detalle")).toBeInTheDocument()
    })
})