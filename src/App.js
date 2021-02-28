import React, {useState} from 'react';

function App() {
  const [todo,setTodo] = useState([{id: 1, name: 'Eat', done: false},
                                             {id: 2, name: 'Pray', done: false},
                                             {id: 3, name: 'Love', done: false},
                                             {id: 4, name: 'Dance', done: false}])
  return (
    <div>
        {
          todo.map((el, i) => <div key={el.id}>
            {el.done ? <s>{el.name}</s> : el.name}
            <button onClick={() => {
              todo[i].done = !todo[i].done;
              setTodo([...todo])
            }}>  {el.done ? 'Undone': 'Done'} </button>
            <button onClick={() => {
              setTodo(todo.filter(e=>e.id!==el.id))
            }}> Delete </button>
            {i>1 && <button onClick={() =>{
              [todo[i],todo[i-1]] = [todo[i-1],todo[i]];
              setTodo([...todo])
            }}> ^ </button>}
            {i<todo.length-1 && <button onClick={() =>{
              [todo[i],todo[i+1]] = [todo[i+1],todo[i]];
              setTodo([...todo])
            }}> v </button>}
          </div>)
        }
      <input type="text" id="newTask"/>
      <button onClick={() => {
        setTodo([...todo, {id: Math.random(), name: document.getElementById("newTask").value}])
        document.getElementById("newTask").value = '';
      }}> Add </button>
    </div>
  );
}

export default App;