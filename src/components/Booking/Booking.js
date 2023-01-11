import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './Booking.module.scss';
import CalendarBooking from '../Atom/Calendar/CalendarBooking';
import Politics from '../Politics/Politics';
import car from '../../db/car.json';
import PopUp from './component/popup/Popup';
import { useAuth } from '../../hooks/index';
import jwt_decode from "jwt-decode";
import { format, parseISO, eachDayOfInterval } from "date-fns";
import {ip} from "../IP/IpConstante";

function Bokking() {
    const { id } = useParams();
    const url = `${ip}/products/${id}`;
    const [carId, setCarId] = useState(null);
    const {token, setToken} = useAuth();
    const [user, setUser] = useState({});
    //const [disabled, setDisabled] = useState(true);
    const product = { id: id };
    
    // CALENDAR: ESTADO 
    const [dateSelected, setDateSelected] = useState([])

    //INFO USUARIO A TRAVES DEL TOKEN
    useEffect(() => {
            if(token) {
            const decoded = jwt_decode(token);
            const userDecoded = {name: decoded.name, lastName: decoded.lastName, email:decoded.email};
            setUser(userDecoded);
            }
    }, [token]);

    //FECH A PRODUCTO ID
    useEffect(() => {
        fetch(url)
        .then((res) => res.json())
        .then((result) => {
            setCarId(result);
        });
    }, [url]);

    //ESTADO CALENDARIO
    const [state, setState] = useState([
        {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
        color:'#F0572D',
        }
    ])
    const month = 1;
    const startDate= (state[0]?.startDate || new Date()).toISOString();
    const startDateF=format(parseISO(startDate),"dd-MM-yyyy");
    const endDate= (state[0]?.endDate || new Date ()).toISOString();
    const endDateF=format(parseISO(endDate),"dd-MM-yyyy");

    //FUNCION: POPUP
    const [isPopUpOpen, setPopUpIsOpen] = useState(false);
    
    const togglePopUp = () => {
        setPopUpIsOpen(!isPopUpOpen);
    };

    //POST DE LA RESERVA
    const handleBooking = () => {
        if(startDate && endDate){
            const url = `${ip}/bookings`;
            fetch(url, {
                method: 'POST', 
                body: JSON.stringify({start_date: startDate, end_date: endDate, product}), 
                headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': "Bearer " + token
                }
            }).then(res => {
                return res.json();
            })
            .then(response => {
                console.log('Success:', response)
                /* if(response.status_code && response.status_code === 400){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: response.message,
                        confirmButtonColor: '#F0572D',
                        color: '#191B1D'
                    })
                    } else{
                        navigate('/login')
                    } */
            })

            .catch(error => console.error('Error:', error));
        }  
    }

    const getDatesInRange = (startDate, endDate) => {
        return eachDayOfInterval({
            start: new Date(startDate),
            end: new Date(endDate),
        });
    };

    //GET DE LIST RESERVA
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
            {isPopUpOpen && <PopUp onRequestClose={togglePopUp} />}
            <header className={styles.header}>
                <div>
                    <h4> {carId.category.category} </h4>
                    <h2> {`${carId.brand} , ${carId.model}`}</h2>
                </div>
                <div>
                    <Link to={`/products/${carId.id}`}> 
                        <i className="fa-solid fa-chevron-left fa-xl"></i>
                    </Link>
                </div>
            </header>
            <section className={styles.section_container}>
                <section className={styles.section_info}>
                    <section className={styles.data_user_container}>
                        <h3> Revisá tus datos </h3>
                        <form className={styles.data_user_form}>
                            <div className={styles.data_user_info}>
                                <div className={styles.data_user_name}>
                                    <label className={styles.data_user_label}> Nombre </label>
                                    <input className={styles.data_user_input} type="text" placeholder={user.name}  disabled />
                                </div>
                                <div className={styles.data_user_lastname}>
                                    <label className={styles.data_user_label}> Apellido </label>
                                    <input className={styles.data_user_input} type="text" placeholder={user.lastName}  disabled />
                                </div>
                            </div>
                            <div className={styles.data_user_mail}>
                                <label className={styles.data_user_label}> Correo electrónico </label>
                                <input className={styles.data_user_input} type="email" placeholder={user.email}  disabled />
                            </div>
                        </form>
                    </section>

                    <section className={styles.calendar_container}>
                            <h3> Seleccioná tu fecha de reserva </h3>
                            <div className={styles.calendar}>
                                <CalendarBooking handleDate ={setState} dateSelected={dateSelected} state={state} setState={setState} />
                            </div>
                    </section>
                </section>
                <section className={styles.booking_container}>
                    <h3 className={styles.booking_title}> Detalle de la reserva </h3>
                    <div className={styles.booking_info}>
                        <div className={styles.container_img}>
                            <img className={styles.card_img} src={carId.portada_url} alt={carId.model}></img>
                        </div>
                        <div className={styles.card_info}>
                            <h3> {carId.category.category} </h3>
                            <h2> {carId.brand} </h2>
                            <h4> <i className={`${styles.icon} fa-solid fa-location-dot`}></i> {`${carId.city.city}, ${carId.city.province}, ${car.city.country}`}</h4>
                            <div className={styles.line} />
                            <div className={styles.date_container}>
                                <p className={styles.booking_date}> Fecha retiro </p>
                                <p> {startDateF} </p>
                            </div>
                            <div className={styles.line} />
                            <div className={styles.date_container}>
                                <p className={styles.booking_date}> Fecha devolución </p>
                                <p> {endDateF} </p>
                            </div>
                            <div className={styles.line} />
                            <Link className={styles.btn_link}>
                                <button /* disabled = {startDate && endDate ? disabled : setDisabled(false)} */  className={styles.button} onClick={ () => {togglePopUp(); handleBooking()} }> Confirmar reserva </button>
                            </Link>
                        </div>
                    </div>
                </section>
            </section>
            <Politics rules={carId.rules} insurance={carId.insurance} cancellation={carId.cancellation}/>
        </div>
    )
}

export default Bokking;