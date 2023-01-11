import React from 'react';
import styles from './NoBookings.module.scss';
import { useNavigate } from "react-router-dom";

function NoBookings() {
    const navigate = useNavigate();

    //SI NO TENGO RESERVAS VOLVER AL HOME
    const handleHome = () => {
        navigate('/');
    }

    return (

        <div className={styles.noBookings_container}>
            <img src="https://media.discordapp.net/attachments/1031733711194046469/1049877924012114040/carsJesi.png" alt="frente de varios autos" />
            <h3 className={styles.noBookings_title}> No tienes reservas realizadas</h3>
            <div className={styles.noBookings_info}>
                <p> Volver al  <span onClick={handleHome}> inicio </span>  para ver todos nuestros autos disponibles</p>
            </div>
        </div>
    )
}

export default NoBookings