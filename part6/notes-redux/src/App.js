import {createStore} from 'redux'
import noteReducer from './reducers/NoteReducer';
const store = createStore(noteReducer)

store.dispatch({
  type:'NEW_NOTE',
  data:{
    content:'Family',
    important:true,
    id:1
  }
});

store.dispatch({
  type:'NEW_NOTE',
  data:{
    content:'Beans',
    important:false,
    id:2
  }
})

store.dispatch({
  type:'TOGGLE_IMPORTANCE',
  data:{
    important:true,
    id:2
  }
})

const App = () => {
  return(
    <div>
      <ul>
        {store.getState().map(note=>
          <li key={note.id}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        )}
        </ul>
    </div>
  )
}

export default App;
