import styles from './notetile.module.css'
import React, { useState } from 'react';
import EditModal from './EditModal';
function NoteTile(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const { title, description, tag, _id: id } = props.note;
  const { deleteNote, updateNote } = props;
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.leftHeader}>{title}</div>
          <div className={styles.rightHeader}>
            <button className={styles.btnEdit} onClick={() => setModalOpen(true)}>edit note</button>
            <button className={styles.btnDelete} onClick={() => deleteNote(id)}>delete note</button>
          </div>
        </div>
        <div className={styles.description}>{description}</div>
        <div className={styles.tag}>{tag}</div>
      </div>
      {modalOpen && <EditModal id={id} updateNote={updateNote} setModalOpen={setModalOpen}/>}
    </>
  );
}

export default NoteTile;
