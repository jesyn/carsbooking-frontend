import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import Search from './Search'
import '@testing-library/jest-dom'

const cityChange= jest.fn()
const onClikCategoryScroll= jest.fn()


describe("Search test", ()=> {
    
    test("should Render", () => {
        render(<Search cityChange={cityChange} onClikCategoryScroll={onClikCategoryScroll}/>)
    })

    
    test("should render Search container", () => {
        render(<Search cityChange={cityChange} onClikCategoryScroll={onClikCategoryScroll}/>)
        expect(screen.getByTestId("search_container")).toBeInTheDocument()
    })

    test("should excute funtion when buttom is clicked", () => {
        render(<Search cityChange={cityChange} onClikCategoryScroll={onClikCategoryScroll}/>)
        const btn = screen.getByRole("button")
        fireEvent.click(btn)
        expect(onClikCategoryScroll).toBeCalled()
    })


})