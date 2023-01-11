import React from "react";
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import styles from './Popup.module.scss'

function PopUp ({ onRequestClose }) {
    // Use useEffect to add an event listener to the document
    useEffect(() => {
        function onKeyDown(event) {
            if (event.keyCode === 27) {
                // Close the modal when the Escape key is pressed
                onRequestClose();
            }
        }

        // Prevent scolling
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", onKeyDown);

        // Clear things up when unmounting this component
        return () => {
            document.body.style.overflow = "visible";
            document.removeEventListener("keydown", onKeyDown);
        };
    });


    return (
        <div className={styles.popUpbackdrop}>
            <div className={styles.popUpcontainer}>
                <div className={styles.popUpbodypopUp}>
                    <i className={`${styles.popUpicon} fa-solid fa-circle-check`}></i>
                    <h2 className={styles.popUph2}>Tu producto se ha creado con éxito.</h2>
                    <Link to='/'>
                        <button className={styles.popUpbutton} type="button">Aceptar</button>
                    </Link>
                </div>
            </div>
        </div> 
    );
}


export default PopUp;