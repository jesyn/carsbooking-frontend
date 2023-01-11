import React from "react";
import { useEffect } from 'react';
import CarouselPopup from "./CarouselPopup";
import styles from './Popup.module.scss';


function PopUp ({ images, onRequestClose, count}) {
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
            <div data-testid="popup" className={styles.popUpbackdrop}>
                <div data-testid="popup_container" className={styles.popUpcontainer}>
                    <button className={styles.popUpButton} type="button" onClick={onRequestClose}>
                        X
                    </button>
                    <CarouselPopup images={images} count={count}/>
                </div>
            </div> 
        );
}


export default PopUp;