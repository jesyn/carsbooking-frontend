import React, { useState } from "react";
import { useEffect } from "react";
//import cities from '../../db/cities.json';
import styles from "./SelectCity.module.scss";
import {ip} from '../../IP/IpConstante';

function Selector({handleSetCity, condition }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [citiesDb, setCitiesDb] = useState([]);
    const toggling = () => setIsOpen(!isOpen);
    
    const handleClick = (city) => {
        setSelectedOption(city.city);
        setIsOpen(false);
        handleSetCity(city);
    }

    useEffect( () => {
        fetch(`${ip}/cities`)
        .then((res) => res.json())
        .then((result) => {
            setCitiesDb(result);
            
        })
    },[]) 

    return (
        <section className={styles.location}>
            <div className={styles.select}>
                <div onClick={toggling} className={styles.preselected_option}>
                    <div>
                        <i className="fa-solid fa-location-dot"></i>
                    </div>
                    <p className={styles.city_name}>
                        {selectedOption || "seleccione una ciudad"}
                    </p>
                </div>
                {
                    isOpen && (
                        <div className={styles.list_container}>
                            <ul>
                                {citiesDb &&
                                    citiesDb.map((city) => (
                                        <li value={city.city} key={city.id} onClick={() => handleClick(city)}>
                                            <div>
                                                <div className={styles.text_container}>
                                                    <div className={styles.icon}>
                                                        <i className="fa-solid fa-location-dot"></i>
                                                    </div>
                                                    <div className={styles.city_option}>
                                                        {city.city}, {city.province}
                                                        <div>
                                                            {condition && <p className={styles.country}>{city.country}</p> }
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr className={styles.divider} />
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>  
                        </div>
                    )
                }
            </div>
        </section>
    )
}

export default Selector;
