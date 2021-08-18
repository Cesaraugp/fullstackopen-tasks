import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

export const AnecdoteForm = () => {

    const dispatch=useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content= event.target.content.value
        dispatch(createAnecdote(content))
        event.target.content.value=''
      }

      
    return (
        <>          
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
            <div><input name='content' /></div>
            <button>create</button>
            </form>  
        </>
    )
}

