import React, { useState } from "react";
import styles from "./InputImages.module.scss";

function ImputImages({setImgPortrait, setImages, images}) {
    const [state, setState] = useState([
        { type: "file", placeholder: "Cargar imagen" },
    ]);

    //FUNCION PARA SUMAR UN IMPUT DE CARGA
    const handleAdd = () => {
        if (state.length <= 4) {
            setState([
                ...state,
                { type: "file", placeholder: "Cargar imagen" },
            ]);
        } else {
            return;
        }
    };

    //FUNCION PARA BORAR UN IMPUT DE CARGA
    const handleDelete = (index) => {
        const items = [...state];
        items.splice(index, 1);
        setState(items);
    };

    //GUARDAR IMAGENES CARGADA
    const handleOnChange = (index, file) => {
        setImages([...images,file])
        console.log(index, file);
    };

    //GUARDAR IMANGEN DE PORTADA
    const handlePortrait = (file) => {
        setImgPortrait(file)
        console.log('file cargado', file)
    }

    return (
        <div className={styles.images_container}>
            <div className={styles.images}>
                <h3> Cargar imagen de portada </h3>
                <div className={styles.box_container}>
                    <input
                        type="file"
                        id="file"
                        className={styles.fancyFile} 
                        onChange={(e) => handlePortrait(e.target.files[0])}
                        required
                    />
                    {/*  <label className={styles.fancyFileInfo}>
                        <span> Seleccionar imagen de portada</span>
                    </label> */}

                    {/* <div className={styles.box_btn_img}>
                        <button> + </button>
                    </div> */}
                </div>
            </div>
            <div className={styles.images}>
                <h3> Cargar imagenes </h3>
                {state.map((input, index) => (
                    <div key={index} className={styles.box_container}>
                        <input
                            type={input.type}
                            id="file"
                            className={styles.fancyFile}
                            onChange={(e) => handleOnChange(index, e.target.files[0])}
                            required
                        />
                        {/* <label className={styles.fancyFileInfo}>
                            <span> Seleccionar imagen </span>
                        </label> */}

                        <div className={styles.box_btn_img}>
                            <button type="button" onClick={handleAdd}>
                                +
                            </button>
                        </div>
                        {state.length > 1 && (
                            <div className={styles.box_btn_img_delete}>
                                <button
                                    type="button"
                                    onClick={() => handleDelete(index)}
                                >
                                    x
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ImputImages;
