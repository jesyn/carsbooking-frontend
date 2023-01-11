import React from "react";
import styles from "./Categories.module.scss";
//import categories from '../../db/categories.json';
import { useState, useEffect } from "react";
import {ip} from "../IP/IpConstante";

function CategoriesList({ categoryChange, onClikCategoryScroll }) {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        fetch(`${ip}/categories`)
        .then((res) => res.json())
        .then((result) => {
            setCategory(result);
        });
    }, []);

    return (
        <div className={styles.container}>
        <h2 className={styles.title}> Buscar autos por categoría </h2>
        <section className={styles.container_list}>
            {category &&
            category.map((category) => {
                return (
                <article
                    onClick={() => {
                    onClikCategoryScroll();
                    categoryChange(category);
                    }}
                    key={category.id}
                    className={styles.card}
                >
                    <img
                    className={styles.card_img}
                    src={category.img}
                    alt={category.category}
                    ></img>
                    <div className={styles.card_info}>
                        <h4 className={styles.card_title}>{category.category} </h4>
                        <p
                            className={styles.card_price}
                        >{`Desde $${category.price} por día`}</p>
                    </div>
                </article>
                );
            })}
        </section>
        </div>
    );
}

export default CategoriesList;
