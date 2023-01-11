import React from 'react'
import {render, screen} from '@testing-library/react'
import Politics from './Politics'
import '@testing-library/jest-dom'


describe("Politics test", ()=> {
    
    test("should Render", () => {
        render(<Politics />)
    })

    
    test("should render politics", () => {
        render(<Politics />)
        expect(screen.getByTestId("politics")).toBeInTheDocument()
    })

    test("should said qué tenes que saber", () => {
        render(<Politics />)
        expect(screen.getByRole("title")).toHaveTextContent("Qué tenés que saber")
    })

    
    test("should render line", () => {
        render(<Politics />)
        expect(screen.getByTestId("line")).toBeInTheDocument()
    })

    test("should render politics container", () => {
        render(<Politics />)
        expect(screen.getByTestId("politics_container")).toBeInTheDocument()
    })

    test("should render politics list 1", () => {
        render(<Politics />)
        expect(screen.getByTestId("politics_list1")).toBeInTheDocument()
    })

    test("should said Normas", () => {
        render(<Politics />)
        expect(screen.getByRole("rules")).toHaveTextContent("Normas")
    })

    test("should render politics list 2", () => {
        render(<Politics />)
        expect(screen.getByTestId("politics_list2")).toBeInTheDocument()
    })

    test("should said Seguros", () => {
        render(<Politics />)
        expect(screen.getByRole("insurance")).toHaveTextContent("Seguros")
    })

    test("should render politics list 3", () => {
        render(<Politics />)
        expect(screen.getByTestId("politics_list3")).toBeInTheDocument()
    })

    test("should said Cancelación", () => {
        render(<Politics />)
        expect(screen.getByRole("cancellation")).toHaveTextContent("Cancelación")
    })
})