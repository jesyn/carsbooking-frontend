import React, { useState } from "react";
import { useEffect } from "react";
//import cities from '../../db/cities.json';
import styles from "./SelectCategories.module.scss";
import {ip} from "../../IP/IpConstante";

function Selector({ setCategoryId }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [categoryDb, setCategoryDb] = useState([]);
    const placeholder= "seleccione una categoría";
    const toggling = () => setIsOpen(!isOpen);

    const handleClick = (category) => {
        setSelectedOption(category.category);
        setCategoryId(category.id);
        setIsOpen(false);
    }

    useEffect( () => {
        fetch(`${ip}/categories`)
        .then((res) => res.json())
        .then((result) => {
            setCategoryDb(result);
            
        })
    },[])

    return (
        <section className={styles.location}>
            <div className={styles.select}>
                <div onClick={toggling} className={styles.preselected_option}>
                    <div>
                        <i className="fa-solid fa-car"></i>
                    </div>
                    <p className={styles.category_name}>
                        {selectedOption || placeholder}
                    </p>
                </div>
                {
                    isOpen && (
                        <div className={styles.list_container}>
                            <ul>
                                {categoryDb &&
                                    categoryDb.map((category) => (
                                        <li value={category.category} key={category.id} onClick={() => handleClick(category)}>
                                            <div>
                                                <div className={styles.text_container}>
                                                    <div className={styles.icon}>
                                                        <i className="fa-solid fa-car"></i>
                                                    </div>
                                                    <div className={styles.category_option}>
                                                        {category.category}
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
