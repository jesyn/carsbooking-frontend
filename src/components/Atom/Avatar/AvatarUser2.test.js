import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import AvatarUser2 from './AvatarUser2'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'


beforeAll(()=> {
    const users= [{name:"jesi", lastName:"Bordon"}]
    localStorage.setItem("users", JSON.stringify(users))

})


describe("avatar desktop test", ()=> {
    
    test("should Render", () => {
        render(<AvatarUser2 />)
    })

    test("should excute funtion when button X is clicked", () => {
        const closeSesion = jest.fn()
        render(<BrowserRouter> <AvatarUser2 closeSesion={closeSesion}/> </BrowserRouter>)
        const btn = screen.getByRole("button")
        fireEvent.click(btn)
        expect(closeSesion).toBeCalled()
    })

    test("should said Hola when login", () => {
        render(<AvatarUser2 />)
        expect(screen.getByText("Hola,")).toBeInTheDocument()
    })

    test("should render container", () => {
        render(<AvatarUser2 />)
        expect(screen.getByTestId("avatar_container")).toBeInTheDocument()
    })
})