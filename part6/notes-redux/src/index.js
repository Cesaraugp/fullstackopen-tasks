import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import noteReducer from './reducers/NoteReducer'

const store = createStore(noteReducer)

const renderApp=()=>{
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
    );
    
  }
renderApp()
store.subscribe(renderApp)