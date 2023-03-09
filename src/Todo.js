import { Button, List, ListItem, ListItemText, Modal } from '@mui/material'
import { deleteDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from './firebase'
import './Todo.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

// const useStyles = makeStyles((theme) => ({
//     paper: {
//         position: 'absolute',
//         width: 400,
//         backgroundColor: theme.palette.background.paper,
//         border: '2px solid #000',
//         boxShadow: theme.shadows[5],
//         padding: theme.spacing(2, 4, 3),
//     },
// }));

function Todo(props) {

    // const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');

    const deleteTodo = (event) => {
        event.preventDefault();

        const docRef = doc(db, "Todos", props.id);

        deleteDoc(docRef).then(() => alert("Todo Deleted!!!"));
    }

    const updateTodo = (event) => {
        event.preventDefault();
        const docRef = doc(db, "Todos", props.id);

        updateDoc(docRef, {
            text: input,
            timeStamp: serverTimestamp(),
        }).then(() => alert("Todo Updated!!!"));

        setOpen(false);
    }

  return (
    <>
    <Modal
    open={open}
    onClose={e => setOpen(false)}
    >
        <form>
            <div className="todo__modal">
                <h1>Update your Todo</h1>
                <input type="text" placeholder={props.text} value={input} onChange={event => setInput(event.target.value)}/>
                <Button type='submit' onClick={updateTodo} variant="contained" color='primary'>Update Todo</Button>
            </div>
        </form>
    </Modal>
    <List className='todo'>
       <ListItem>
        <ListItemText primary="Todo" secondary={props.text}/>
       </ListItem>
        <EditIcon onClick={e => setOpen(true)}/>
       <DeleteForeverIcon onClick={deleteTodo}/>
    </List>
    </>
  )
}

export default Todo
