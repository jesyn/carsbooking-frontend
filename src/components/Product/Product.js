import React from "react";
import Swal from 'sweetalert2'
import { useState, useEffect } from "react";
import Caracteristics from "./Caracteristics";
import styles from "./Product.module.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import Galery from "./Galery";
import Map from "../Atom/Map/Map";
import Politics from "../Politics/Politics";
import Spinner from '../Atom/Spinner/Spinner'
import CalendarBooking from "../Atom/Calendar/CalendarBooking";
import { eachDayOfInterval } from "date-fns";
import {ip} from "../IP/IpConstante";
//import carId from '../../db/car.json';

function Product() {
    const { id } = useParams();
    const url = `${ip}/products/${id}`;
    const [carId, setCarId] = useState(null);
    const [loading, setLonding] = useState(true);
    const navigate = useNavigate();

    //FECH A PRODUCTO ID
    useEffect(() => {
        fetch(url)
        .then((res) => res.json())
        .then((result) => {
            setCarId(result);
            setLonding(false);
            //console.log(result)
        });
    }, [url]);

    //ESTADO CALENDARIO
    const [state, setState] = useState([
        {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
        color: "#F0572D",
        disabled: true
        },
    ]);
    const month = 1;

    //CHEQUEAR SI TIENE TOKEN Y ESTA LOGUEADO
    const tokenCheck = () => {
        const token = localStorage.getItem('token');
        localStorage.setItem("prevUrl", window.location.pathname);
        
        if(token){
            navigate(`/products/${id}/booking`);
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Antes de reservar, debes estar logueado",
                confirmButtonColor: '#F0572D',
                color: '#191B1D'
            })
            navigate('/login');
        }
    }

    // GET: FUNCION FETCH DE LISTAR BOOKING POR ID
    const getDatesInRange = (startDate, endDate) => {
        return eachDayOfInterval({
          start: new Date(startDate),
          end: new Date(endDate),
        });
    };
    const [dateSelected, setDateSelected] = useState([])
    const selectedDate = (result) => {
        if(!result){
            return null
        }
        const dateSelected = result.map((({ start_date, end_date }) => {
            return getDatesInRange(start_date, end_date);
        }));
        setDateSelected(dateSelected.flat());
    };
    
    useEffect(() => {
        getBooking()
    }, []);
    

    const getBooking = () => {
        const url = `${ip}/bookings/product/${id}`;
        fetch(url)
        .then((res) => res.json())
        .then((result) => {
            selectedDate(result)
        });
    }

    if (carId === null) {
        return null;
    }
    return (
        <div className={styles.container}>
        <header className={styles.header}>
            <div>
            <h4> {carId.category.category} </h4>
            <h2> {carId.brand},  {carId.model} </h2>
            </div>
            <div>
            <Link to="/">
                <i className="fa-solid fa-chevron-left fa-xl"></i>
            </Link>
            </div>
        </header>

        <section className={styles.location}>
            <i className="fa-solid fa-location-dot"></i>
            <p>
            {` ${carId.city.city} , ${carId.city.province} , ${carId.city.country} `}{" "}
            </p>
        </section>

        {loading ? (
            <Spinner />
        ) : (
            <Galery carImages={carId.images} carPortrait={carId.portada_url} />
        )}
        <section className={styles.info}>
            <h3> Detalles </h3>
            <p> {carId.description} </p>
        </section>

        <Caracteristics carTopics={carId.characteristics} />

        <section className={styles.booking}>
            <h3> Fechas disponibles </h3>
            <div className={styles.booking_date}>
                <div className={styles.booking_calendar}>
                    <CalendarBooking handleDate ={setState} state={state} setState ={setState}  dateSelected={dateSelected} />
                </div>
                <div className={styles.booking_info}>
                    <p> Agregá tus fechas de viaje para obtener precios exactos </p>
                    <button onClick={tokenCheck} className={styles.booking_button}> Reservar </button>
                </div>
            </div>
        </section>

        <section className={styles.map}>
            <h3> Ubicación </h3>
            <p> {`${carId.city.province} , ${carId.city.country}`} </p>
            <div className={styles.line} />
            <Map lat={carId.city.latitude} long={carId.city.longitude} city={carId.city.city}/>
        </section>

        <Politics rules={carId.rules} insurance={carId.insurance} cancellation={carId.cancellation} />
        </div>
    );
    }

    export default Product;
