//import { type } from '@testing-library/user-event/dist/type';
import React, { useReducer, useState } from 'react';

let initialstate=[];


//all state is updated inside these reducer
function reducer(state,action){
    switch(action.type){
        case "Add":
            return [...state,{id:state.length+1,name:action.payload}]
        case "delete":return state.filter(x=>x.id !== action.payload)
        case "reset":return change(action.payload);
        default:return state;
    }
}
function change(initialstate){
    return initialstate;
}
const Todoapp = () => {
    const [state,dispatch]=useReducer(reducer,initialstate,change);
    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleAddTask = () => {
        if (inputValue.trim()) {
            dispatch({ type: "Add", payload: inputValue });
            setInputValue('');
        }
    };
    
  return (
    <div className='con'>
        <h1>Todo Application</h1>
        
        <input type="text"  placeholder='ADD NEW TASK' value={inputValue} 
                onChange={handleInputChange}/>
        <button onClick={handleAddTask}>Add</button>

        <button onClick={()=>dispatch({type:"reset",payload:initialstate})}>reset</button>

      <hr></hr>
      <p>NUMBER OF TASKS {state.length}</p>
        <ul>
        {state.map(x=><li>{x.name}
            <span><button onClick={()=>dispatch({type:"delete",payload:x.id})}>Delete</button></span>
        </li>)}
        </ul>      
    </div>
  );
}

export default Todoapp;
