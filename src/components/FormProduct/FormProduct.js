import React, { useState } from "react";
import Swal from "sweetalert2";
import styles from "./FormProduct.module.scss";
import { Link } from "react-router-dom";
import SelectCity from "../Atom/SelectCity/SelectCity";
import SelectCategories from "../Atom/SelectCategories/SelectCategories";
import {ip} from "../IP/IpConstante";
import ImputItems from "./componentes/ImputItems";
import ImputImages from "./componentes/InputImages";
import PopUp from "./componentes/Popup";

function FormProduct() {
    const [ caracteristic, setCaracteristic ] = useState('')
    const [ categoryId, setCategoryId ] = useState("")
    const [ city, setCity ] = useState("")
    const [ imgPortrait, setImgPortrait ] = useState([])
    const [ images, setImages] = useState([])

    //FUNCION: POPUP
    const [isPopUpOpen, setPopUpIsOpen] = useState(false);
    
    const togglePopUp = () => {
        setPopUpIsOpen(!isPopUpOpen);
    };

    const submit =  async(e)=> {
        e.preventDefault()
        const {brand,model,patente,descripcionProduct,normas,seguro,cancelacion} = e.target.elements
        
        //GUARDAMOS LAS CARACTERISTICAS Y PEDIMOS QUE MINIMO SELECCIONE UNA
        let checkedCaracterist = [];
        if(caracteristic){
            checkedCaracterist = caracteristic.filter(item => item.checked)
        }else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Debe seleccionar al menos una característica",
                confirmButtonColor: "#F0572D",
                color: "#191B1D",
            })
        }

        //VALIDAMOS QUE SELECCIONE UNA CIUDAD
        if(!city){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Debe seleccionar una ciudadd",
                confirmButtonColor: "#F0572D",
                color: "#191B1D",
            })
        }

        //VALIDAMOS QUE SELECCIONE UNA CATEGORIA
        if(!categoryId){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Debe seleccionar una categoría",
                confirmButtonColor: "#F0572D",
                color: "#191B1D",
            })
        }

        //INFO PRODUCTO
        const product = JSON.stringify({
            "brand": brand.value,
            "model": model.value,
            "description": descripcionProduct.value,
            "rules": normas.value,
            "insurance": seguro.value,
            "cancellation": cancelacion.value,
            "city": {
                "id": city.id
                
            },
            "category": {
                "id": categoryId
                
            }
            ,
            "patente": patente.value,
            "characteristics": checkedCaracterist
            
        }) 

        //PRODUCTO
        const blob = new Blob([product], {type:"application/json"})
        const file = new File([blob], "test.json", {type:"application/json"})
        const formData = new FormData()
        formData.append("product", blob)

        //GUARDAR IMAGENES
        const filePortada = imgPortrait;
        const fileImages = images;
        formData.append("portada_url", filePortada)
        formData.append("images", fileImages[0])
        formData.append("images", fileImages[1])
        formData.append("images", fileImages[2])
        formData.append("images", fileImages[3])
        formData.append("images", fileImages[4])

        const settings = {
            method: 'POST',
            body: formData,
            
        }

        fetch(`${ip}/products`, settings)
        
    }

    return (
        <div className={styles.container}>
            {isPopUpOpen && <PopUp onRequestClose={togglePopUp} />}
            <header className={styles.header}>
                <div>
                <h2> Administración de productos </h2>
                </div>
                <div>
                <Link to="/">
                    <i className="fa-solid fa-chevron-left fa-xl"></i>
                </Link>
                </div>
            </header>

            <h2 className={styles.sub_title}> Agregar auto </h2>

            <form onSubmit={submit} className={styles.form_container}>
                <div className={styles.data_box}>
                    <div className={styles.data_box1}> 
                        <label> Nombre de la marca </label>
                        <input type="text" placeholder="ejemplo: Ford" name="brand" className={styles.infoInput} required  />
                        <label> Nombre del modelo </label>
                        <input type="text" placeholder="ejemplo: corsa" name="model" className={styles.infoInput} required />
                        <label> Patente </label>
                        <input type="text" placeholder="ejemplo: IML428" name="patente" className={styles.infoInput} required />
                        
                    </div>
                    <div className={styles.data_box1}>
                        
                        <label> Categoría </label>
                        <SelectCategories setCategoryId={setCategoryId} />
                        <label> Ciudad </label>
                        <SelectCity handleSetCity={setCity} />
                        
                    </div>
                </div>

                <label> Descripción </label>
                <textarea
                    type="text"
                    placeholder="Compacto de 3 puertas. Capacidad: 2 personas. Combustible: Eléctrico."
                    name="descripcionProduct"
                    defaultValue="Compacto de 3 puertas. Capacidad: 2 personas. Combustible: Eléctrico"
                    required
                />
                
                <ImputItems setCaracteristic={setCaracteristic} />
                
                <h3> Políticas del producto </h3>
                <div className={styles.politics_container}>
                    <div className={styles.politics_box}>
                        <h4> Normas </h4>
                        <label> Descripción </label>
                        <textarea
                            type="text"
                            placeholder="La tolerancia de la reserva será de una hora. En los casos que soliciten permiso de cruce de frontera, la cobertura mecánica y el acarreo en el exterior serán a cargo del cliente."
                            name="normas"
                            defaultValue='La tolerancia de la reserva será de una hora. En los casos que soliciten permiso de cruce de frontera, la cobertura mecánica y el acarreo en el exterior serán a cargo del cliente.'
                            required
                        />
                    </div>
                    <div className={styles.politics_box}>
                        <h4> Seguro </h4>
                        <label> Descripción </label>
                        <textarea
                            type="text"
                            placeholder="PLUS COVER - Cobertura que reduce 100% la franquicia por daños de colisión."
                            name='seguro'
                            defaultValue='PLUS COVER - Cobertura que reduce 100% la franquicia por daños de colisión.'
                            required
                        />
                    </div>
                    <div className={styles.politics_box}>
                        <h4> Políticas de cancelación </h4>
                        <label> Descripción </label>
                        <textarea
                            type="text"
                            placeholder="Ante una cancelación o no show de la reserva pre pagada online, se retendrá un 4% + IVA de la misma en concepto de gastos administrativos y se aplicará un cargo por cancelación."
                            name='cancelacion'
                            defaultValue='Ante una cancelación o no show de la reserva pre pagada online, se retendrá un 4% + IVA de la misma en concepto de gastos administrativos y se aplicará un cargo por cancelación.'
                            required
                        />
                    </div>
                </div>
                
                <ImputImages  setImgPortrait={setImgPortrait} setImages={setImages} images={images} />
                
                <div className={styles.btn_container}>
                    <div className={styles.btn_submit}> 
                        <button type="submit" onClick={togglePopUp}> Crear </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default FormProduct;
