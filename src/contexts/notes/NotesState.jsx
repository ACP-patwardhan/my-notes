import React, { useState, createContext } from 'react';
import { host, endpoints } from '../../constants/requestConstants';
export const NotesContext = createContext();


function NotesState(props) {
  const [notes, setNotes] = useState([]);
  //gets all notes and sets them in this state
  const getAllNotes = async () => {
    const url = host + endpoints.fetchAllNotes;
    const authToken = localStorage.getItem('authToken');
    if (!authToken) return;
    const notesResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken
      },
    });
  let fetchedNotes = await notesResponse.json();
  console.log(fetchedNotes);
  setNotes(...notes,fetchedNotes)
  }
  
  //setsNotes for UI if notes are added to DB.
  const addNote = async (title, description, tag) => {
    const url = host + endpoints.addANote;
    const authToken = localStorage.getItem('authToken');
    const data = {title, description, tag};
    const notesResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken
      },
      body: JSON.stringify(data)
    });
    const {success,note} = await notesResponse.json();
    if(success){
      setNotes(notes.concat(note));
      console.log('successfully added ',note);
    }
  }
  return (
    <NotesContext.Provider value={{ notes, addNote,getAllNotes }}>
      {props.children}
    </NotesContext.Provider>
  )
}

export default NotesState;
