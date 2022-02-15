import React from 'react';

function NoteTile(props) {
    const {title,description,tag} = props.note;
  return (<div>
      <h3>{title}</h3>
      <div>{description}</div>
      <div>{tag}</div>
  </div>);
}

export default NoteTile;
