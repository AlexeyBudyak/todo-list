import React, {useState, useEffect} from 'react';

function App() {
  const [todo,setTodo] = useState([])

    useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(x => x.json())
      .then(el => setTodo(el.slice(0,10)) );
    }, []);

  const shortView = str => str.length < 20 ? str : str.slice(0,17) + '...';
  return (
    <div>
        {
          todo.map((el, i) => <div key={el.id}>
            {el.completed ? <s>{shortView(el.title)}</s> : shortView(el.title)}
            <button onClick={() => {
              todo[i].completed = !todo[i].completed;
              setTodo([...todo])
            }}>  {el.completed ? 'Undone': 'Done'} </button>
            <button onClick={() => {
              todo[i].trash = true;
              setTodo([...todo])
            }}> Delete </button>
            {i>1 && <button onClick={() =>{
              [todo[i],todo[i-1]] = [todo[i-1],todo[i]];
              setTodo([...todo])
            }}> ^ </button>}
            {i<todo.length-1 && <button onClick={() =>{
              [todo[i],todo[i+1]] = [todo[i+1],todo[i]];
              setTodo([...todo])
            }}> v </button>}

             {el.trash &&
             <span>
               Are you sure you want delete '{shortView(el.title)}'?
               <button onClick={() =>{
              setTodo(todo.filter(e=>e.id!==el.id))
            }}> Yes </button>
             <button onClick={() =>{
              todo[i].trash = false;
              setTodo([...todo])
             }}> No </button></span>
             }

          </div>)
        }
      <input type="text" id="newTask"/>
      <button onClick={() => {
        setTodo([...todo, {id: Math.random(), title: document.getElementById("newTask").value}])
        document.getElementById("newTask").value = '';
      }}> Add </button>
    </div>
  );
}

export default App;