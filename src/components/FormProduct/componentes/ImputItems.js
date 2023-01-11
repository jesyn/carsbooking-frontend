import React, { useEffect, useState } from "react";
import styles from "./InputItems.module.scss";
import {ip} from "../../IP/IpConstante";

function ImputItems({setCaracteristic}) {
    const [characteristics, setcharacteristics] = useState([]);
    
    
    useEffect(() => {
        fetch(`${ip}/characteristics`)
            .then((res) => res.json())
            .then((result) => {
                const data = result.map(item => ({
                    ...item, checked: false
                })
            )
            setcharacteristics(data);
        });
    }, []);
    

    //console.log('characteristics', characteristics);

    const handleOnChange = (element) => {
        const updatedCharacteristics = characteristics.map(item => {
            if(item.id === element.id){
                item.checked = !item.checked
            }
            return item 
        })
        setcharacteristics(updatedCharacteristics)
        setCaracteristic(updatedCharacteristics)
    } 

    return (
        <>
        <h3> Seleccione características </h3>
                <ul>
                    {characteristics &&
                    characteristics.map((caracteristic, index) => {
                        return (
                                    <li className={styles.checkbox_box} key={index}>
                                        <input
                                        className={styles.inputCheck}
                                        type="checkbox"
                                        id={`custom-checkbox-${index}`}
                                        name={caracteristic.characteristic}
                                        value={caracteristic.characteristic}
                                        checked={caracteristic.checked}
                                        onChange={() => handleOnChange(caracteristic)}
                                        placeholder={caracteristic.characteristic}
                                        />
                                        <p> {caracteristic.characteristic} </p>
                                    </li>
                        );
                    })}
                </ul>
        </>
    )
}

export default ImputItems