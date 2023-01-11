import React, { useEffect } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useState } from 'react';
import styles from './CalendarBooking.scss';
import Calendar from './Calendar';


function CalendarBooking ({handleDate, dateSelected, state, setState}) {
    /* const [state, setState] = useState([
            {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
            color:'#F0572D',
            }
    ]) */
    const [month, setMonth] = useState(1)    
    const disableDates = dateSelected;
    // console.log('disableDates', disableDates);
    useEffect(() => {
        if(window.innerWidth >= 768){
            setMonth(2);
        }
        if(state){
            handleDate(state)   
        }
    },[state])
    return (
        <Calendar state={state} setState={setState} month={month} disableDates={disableDates} />
    )
}

export default CalendarBooking;