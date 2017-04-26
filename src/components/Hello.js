import React from 'react';
import styles from './Hello.css';
console.log('styles',styles); 

const Hello = ({name}) => (
    <h1 className="Hello__heading">Hwwello, {name}</h1>
);

export default Hello;
