import React from 'react'
import {render, screen} from '@testing-library/react'
import SocialMedia from './SocialMedia'


describe("Social media test", () => {
    test("should Render", () => {
        render(<SocialMedia />)
        
    })

    test("should Render tree links", () => {
        render(<SocialMedia />)
        expect(screen.getAllByRole("link")).toHaveLength(3)
    })
})
    

