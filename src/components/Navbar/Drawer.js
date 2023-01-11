import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SocialMedia from '../Atom/SocialMedia/SocialMedia';
import styles from './Drawer.module.scss';

function Drawer({closeDrawer}) {

    const {pathname } = useLocation();

    return (
        <>
            <div className={styles.burger_header}>
                <button onClick={closeDrawer}> X </button>
                <h2> Menú </h2>
            </div>
            <ul className={styles.burguer_list}> 
                {pathname && <>
                                <Link to='/user-register'> { pathname === '/user-register' ? '' : <li onClick={closeDrawer}> Crear cuenta </li> }  </Link> 
                                { pathname === '/user-register' && '/login' ? '' : <div className={styles.line} /> }
                                <Link to='/login'>{ pathname === '/login' ? '' : <li onClick={closeDrawer}> Iniciar sesión </li>  }</Link>
                            </>
                }
            </ul>
            <div className={styles.icons}>
                <SocialMedia />
            </div>
    
        </>
    )
}

export default Drawer;

