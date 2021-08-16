const noteReducer= (state=[],action)=>{
    switch(action.type){
      case 'NEW_NOTE':
        return [...state,action.data]
      case 'TOGGLE_IMPORTANCE':
          const noteToChange= state.find(note=>note.id===action.data.id)
          const changedNote={...noteToChange,important:!noteToChange['important']}
          return state.map(note =>
            note.id !== action.data.id ? note : changedNote 
          )    
      default:
        return state
    
      }
      
  }
  export default noteReducer