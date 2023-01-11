import React from 'react';
import styles from './SocialMedia.module.scss';


function SocialMedia() {


    return (
        <div className={styles.icons}>
            <a href='https://www.instagram.com/' target="_blank" rel="noopener noreferrer"> 
                <i className={`${styles.icon} fa-brands fa-instagram`}></i>
            </a>
            <a href='https://www.facebook.com/' target="_blank" rel="noopener noreferrer"> 
                <i className={`${styles.icon} fa-brands fa-facebook`}></i>
            </a>
            <a href='https://web.whatsapp.com/' target="_blank" rel="noopener noreferrer"> 
                <i className={`${styles.icon} fa-brands fa-whatsapp`}></i>
            </a>
        </div>
    )
}

export default SocialMedia;