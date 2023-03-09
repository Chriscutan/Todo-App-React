import { FormControlUnstyled } from '@mui/base';
import { Button, Input } from '@mui/material';
import { addDoc, onSnapshot, serverTimestamp, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import './App.css';
import { colRef} from './firebase';
import Todo from './Todo';

function App() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    //Fires when the component loads once

    const q = query(colRef, orderBy('timeStamp', 'desc'));

    onSnapshot(q, (snapshot) => {
      setTodos(snapshot.docs.map((doc) => ({id: doc.id, text: doc.data().text})));
    })
  }, [])

  const addTodo = (event) => {
    event.preventDefault();
    addDoc(colRef, {
      text: input,
      timeStamp: serverTimestamp(),
    })
    setInput('');
  }
  return (
    <div className="App">

    <form>
    <FormControlUnstyled required >
      <Input type="text" placeholder='Enter Todo' value={input} onChange={event => setInput(event.target.value)}/>
      <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">
        Add Todo
      </Button>
    </FormControlUnstyled>
  </form>
      {/* <form>
        <input type="text" placeholder='Enter Todo' value={input} onChange={event => setInput(event.target.value)}/>
        <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">
          Add Todo
        </Button>
      </form> */}

      <ul>
        {
          todos.map((todo) => (
            <Todo id={todo.id} text={todo.text}/>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
