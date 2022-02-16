import React,{useState} from 'react';
import formStyles from '../signup/signup.module.css';
import styles from './editmodal.module.css';
function EditModal(props) {
    const [updatedNote,setUpdatedNote] = useState({title:"",description:"",tag:""});
    const {updateNote, id, setModalOpen} = props; 
    const handleSubmit = (e) => {
        e.preventDefault();
        const { title, description, tag } = updatedNote;
        updateNote(title, description, tag, id);
        setModalOpen(false)
    }
    const onChangeHandler = (e) => {
        setUpdatedNote({ ...updatedNote, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className={styles.backdrop}>
                <div className={styles.content}>
                    <div className={styles.header}>
                        Edit Note
                        <button className={styles.btnDelete} onClick={()=>setModalOpen(false)}>close</button>
                    </div>
                    <form onSubmit={handleSubmit} className={formStyles.form}>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" onChange={onChangeHandler} />
                    <label htmlFor="description">Description</label>
                    <textarea className={styles.inputDesc} type="text" name="description" id="description" onChange={onChangeHandler} />
                    <label htmlFor="tag">tag</label>
                    <input type="text" name="tag" id="tag" onChange={onChangeHandler} />
                    <button type="submit" className={formStyles.btn}>Submit</button>
                </form>
                </div>
            </div>
        </>
    );
}

export default EditModal;
