import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render} from '@testing-library/react'
import Blog from './Blog'
import {fireEvent} from '@testing-library/dom'

let mockFn
let component
beforeEach(() => {

    const blog = {
        title:'titleGoesHere',
        url:'urlhere',
        author:'me',
        likes:5
    }

    mockFn=jest.fn()

   component= render(<Blog blog={blog} handleLike={mockFn}/>) 
  })


describe('Rendering content',()=>{
    test('renders title and name',()=>{
        expect(component.container).toHaveTextContent(`titleGoesHere - me`)    
    })
    test('Not rendering URL',()=>{
        const urlDiv=component.container.querySelector('.blogUrl')
        expect(urlDiv).toBeNull()
    })
    test('Not rendering likes',()=>{
        const likesDiv=component.container.querySelector('.blogLikes')
        expect(likesDiv).toBeNull()
    })


})

describe('Button click events',()=>{
    test ('Url and likes are shown when the show button is clicked',()=>{
        const showButton=component.container.querySelector('.showHideButton')
        fireEvent.click(showButton)

        const urlDiv=component.container.querySelector('.blogUrl')
        const likesDiv=component.container.querySelector('.blogLikes')

        expect(urlDiv).toBeDefined()
        expect(urlDiv).toHaveTextContent('urlhere')
        expect(likesDiv).toBeDefined()
        expect(likesDiv).toHaveTextContent('5')
    })
    test ('like Button is defined and clicked twice',()=>{
        const showButton=component.container.querySelector('.showHideButton')
        fireEvent.click(showButton)
        
        const likesButton=   component.getByText('like')
        fireEvent.click(likesButton)
        fireEvent.click(likesButton)

        const likesDiv=component.container.querySelector('.blogLikes')
        expect(mockFn.mock.calls).toHaveLength(2)
        //component.container.querySelector('.likeButton')
        //component.container.querySelector('.blogLikes');
       // likesDiv.debug()
        //const likesButton=likesDiv.container.querySelector('.likeButton')
 
        //expect(likesButton).toBeDefined()
        
    })
})



/* 
test('clicking the button calls eent handler once',()=>{
    const note = {
        content:'Component testing is done with react-testing library',
        important:true
    }
    const mockHandler=jest.fn();

    const component = render(
        <Note note={note} toggleImportance={mockHandler}/>

    )

    const button = component.getByText('make not important')

    fireEvent.click(button);

    expect (mockHandler.mock.calls).toHaveLength(1);



}) */