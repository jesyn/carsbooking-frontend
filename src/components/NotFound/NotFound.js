import React from 'react';
import styles from './NotFound.module.scss';

function NotFound() {
  
  return (
    <div data-testid="notFound_container">
      <h1 role="error_text" className={styles.error} > página no encontrada </h1>
    </div>
  )
}

export default NotFound