import React from 'react';
import styles from './Hello.css';
console.log('styles',styles); 

const Hello = ({name}) => (
    <h1 className={styles.heading}>Hello, {name}</h1> 
);

export default Hello;
