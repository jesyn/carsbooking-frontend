import React from 'react'
import {render, screen} from '@testing-library/react'
import Burger from './BurgerMenu'
import '@testing-library/jest-dom'


describe("Burger Menu test", ()=> {
    
    test("should Render", () => {
        render(<Burger />)
    })

    test("should render burger menu button", () => {
        render(<Burger />)
        expect(screen.getByRole("button")).toBeInTheDocument()
    })

    test("should render menu_icon", () => {
        render(<Burger />)
        expect(screen.getByRole("menu_icon")).toBeInTheDocument("Menu")
    })

})