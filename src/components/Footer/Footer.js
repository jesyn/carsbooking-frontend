import React from 'react';
import styles from './Footer.module.scss';
import SocialMedia from '../Atom/SocialMedia/SocialMedia';

function Footer() {
  
  return (
    <div data-testid="footer_container" className={styles.footer_container}>
        <p role="copy_right" className={styles.footer_iso}> ©2022 Digital Booking </p>
        <div data-testid="icons" className={styles.icons}>
          <SocialMedia />
        </div>

    </div>
  )
  
}

export default Footer;