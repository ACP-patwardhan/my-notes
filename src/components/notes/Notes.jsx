import formStyles from '../signup/signup.module.css';
import styles from './notes.module.css';
import React, { useState, useContext, useEffect } from 'react';
import { isEmpty } from 'lodash';
import { NotesContext } from '../../contexts/notes/NotesState'
import NoteTile from './NoteTile';
function Notes() {
    const [newNote, setNewNote] = useState({ title: "", description: "", tag: "" })
    const notesState = useContext(NotesContext);

    const { notes, addNote, getAllNotes, deleteNote, updateNote } = notesState;
    useEffect(() => {
        getAllNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { title, description, tag } = newNote;
        addNote(title, description, tag);
    }
    const onChangeHandler = (e) => {
        setNewNote({ ...newNote, [e.target.name]: e.target.value })
    }
    const isDisabled = () => {
        return newNote.title.length === 0 || newNote.description.length === 0 || newNote.tag.length === 0;
    }
    const getErrorText = () => {
        if (newNote.title.length === 0) return 'Note should have a title';
        if (newNote.description.length === 0) return 'Note should have a description';
        if (newNote.tag.length === 0) return 'Note should have a tag';
    }
    const errorText = getErrorText();
    let btnClass = formStyles.btn;
    if (isDisabled()) btnClass = formStyles.disabled;
    return (
        <>
            <div>
                <h1>Add a new Note</h1>
                <form onSubmit={handleSubmit} className={formStyles.form}>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" onChange={onChangeHandler} />
                    <label htmlFor="description">Description</label>
                    <textarea className={styles.inputDesc} type="text" name="description" id="description" onChange={onChangeHandler} />
                    <label htmlFor="tag">tag</label>
                    <input type="text" name="tag" id="tag" onChange={onChangeHandler} />
                    {isDisabled() &&
                        <div className={formStyles.error}>
                            {errorText}
                        </div>
                    }
                    <button type="submit" className={btnClass} disabled={isDisabled()}>Submit</button>
                </form>
            </div>
            {isEmpty(notes) ? <div>
                You don't have any notes currently .
                add a note !
            </div> :
                <div className={styles.notesect}>
                    {
                        notes.map((note,key) => {
                            return <NoteTile key={key} note={note} deleteNote={deleteNote} updateNote={updateNote}/>
                        })
                    }
                </div>
            }
        </>
    );
}

export default Notes;
