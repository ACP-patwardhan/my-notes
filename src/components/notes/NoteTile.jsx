import styles from './notetile.module.css'
import React from 'react';
function NoteTile(props) {
  const { title, description, tag, _id:id } = props.note;
  const {deleteNote} = props;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.leftHeader}>{title}</div>
        <div className={styles.rightHeader}>
          <button className={styles.btnEdit}>edit note</button>
          <button className={styles.btnDelete} onClick={()=>deleteNote(id)}>delete note</button>
        </div>
      </div>
      <div className={styles.description}>{description}</div>
      <div className={styles.tag}>{tag}</div>
    </div>);
}

export default NoteTile;
