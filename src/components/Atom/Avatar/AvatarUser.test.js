import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import AvatarUser from './AvatarUser'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'


beforeAll(()=> {
    const users= [{name:"jesi", lastName:"Bordon"}]
    localStorage.setItem("users", JSON.stringify(users))

})


describe("avatar mobile test", ()=> {
    
    test("should Render", () => {
        render(<AvatarUser />)
    })

    test("should excute funtion when buttom X is clicked", () => {
        const closeMenu = jest.fn()
        render(<BrowserRouter> <AvatarUser closeMenu={closeMenu}/> </BrowserRouter>)
        const btn = screen.getByRole("button")
        fireEvent.click(btn)
        expect(closeMenu).toBeCalled()
    })

    test("should excute funtion when text is clicked", () => {
        const closeSesion = jest.fn()
        render(<BrowserRouter> <AvatarUser closeSesion={closeSesion}/> </BrowserRouter>)
        const btn = screen.getByRole("closeSesion")
        fireEvent.click(btn)
        expect(closeSesion).toBeCalled()
    })

    test("should said Hola when login", () => {
        render(<AvatarUser />)
        expect(screen.getByRole("saludo")).toHaveTextContent("Hola")
    })

    test("should render container", () => {
        render(<AvatarUser />)
        expect(screen.getByTestId("avatar_container")).toBeInTheDocument()
    })
})