import React from 'react';


const Link = ({ text, active, onClick }) => {
  return active ? <span>{text}</span>  : <button onClick={ onClick }>{text}</button>
};

export default Link;