import React, { useEffect } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useState } from 'react';
import styles from './Calendar.scss';
import Calendar from './Calendar';


function RangeCalendar({handleDates}) {
    const [state, setState] = useState([
            {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
            color:'#F0572D',

            }
        ])
    const [month, setMonth] = useState(1);

    const [showCalendar, setShowCalendar] = useState(false);
    const [inputInfo, setInputInfo] = useState("fecha inicial - fecha final");
    const toggling = () => setShowCalendar(!showCalendar);
    
    const handleClik = (state) => {
        
        const options = { month: 'short', day: 'numeric' };
        if(state[0].startDate && state[0].endDate){
            const finalPlaceHolder = `${state[0].startDate.toLocaleDateString("es-ES", options)} - ${state[0].endDate.toLocaleDateString("es-ES", options)}`;
            setInputInfo(finalPlaceHolder);
        }
        setShowCalendar(false);
        handleDates(state);
    }

    useEffect(() => {
        if(window.innerWidth >= 768){
            setMonth(2);
        }
        
    },[])

    /* useEffect( () => {
        const options = { month: 'short', day: 'numeric' };
        if(state[0].startDate && state[0].endDate){
            const finalPlaceHolder = `${state[0].startDate.toLocaleDateString("es-ES", options)} - ${state[0].endDate.toLocaleDateString("es-ES", options)}`
            setInputInfo(finalPlaceHolder)
        }
    },[state]) */

    return (
        <div data-testid="calendar_container" className='calendar_container'>
            <div data-testid="calendar_input_container" className='calendar_input_container'>
                <div data-testid="calendar_input_date" className='calendar_input_date'>
                    <div data-testid="calendar_icon_date" className='calendar_icon_date'>
                        <i className="fa-regular fa-calendar"></i>
                    </div>
                    <input  role="input"
                            onClick={toggling}
                            placeholder={inputInfo}
                            className='calendar_input_date'
                    >
                    </input>
                    {showCalendar &&  <div className='calendar'> 
                        <Calendar state={state} setState={setState} month={month}/>
                        <button role="aplicar" onClick={() => handleClik(state)} className='btn_calendar'>Aplicar</button>
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default RangeCalendar;