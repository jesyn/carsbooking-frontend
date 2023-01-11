import React from "react";
import Swal from "sweetalert2";
import { useState } from "react";
import styles from "./Search.module.scss";
import RangeCalendar from "../Atom/Calendar/RangeCalendar";
import SelectCity from "../Atom/SelectCity/SelectCity";

function Search({
    cityChange,
    onClikCategoryScroll,
    dateChange,
    cityAndDateChange,
}) {
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const condition = true;

    const handleSubmit = (event) => {
        event.preventDefault();
        if (city === "" && state === "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "el campo ciudad o fecha deben ser completado",
                confirmButtonColor: "#F0572D",
                color: "#191B1D",
            });
            onClikCategoryScroll();
        }
        cityChange(city);
        dateChange(state);
        cityAndDateChange(state, city);
    };

    return (
        <>
            <form
                data-testid="search_container"
                className={styles.form_container}
                onSubmit={handleSubmit}
            >
                <div className={styles.selectCity_container}>
                    <SelectCity handleSetCity={setCity}  condition={condition}  />
                </div>
                <div className={styles.selectDate_container}>
                    <RangeCalendar handleDates={setState} />
                </div>
                <div className={styles.btn_container}>
                    <button
                        onClick={onClikCategoryScroll}
                        className={styles.button_search}
                        type="submit"
                    >
                        Buscar
                    </button>
                </div>
            </form>
        </>
    );
}

export default Search;
