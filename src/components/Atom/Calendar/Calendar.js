import React from 'react';
import { DateRange } from 'react-date-range';
import { es } from 'date-fns/locale';
import { addDays } from 'date-fns';


function Calendar({state, setState, month, disableDates}) {

    return (
            <DateRange
                closeOnScroll={true}
                editableDateInputs={false}
                color="#DFE4EA"
                direction="horizontal"
                locale={es}
                minDate={addDays(new Date(), 0)}
                months={month}
                moveRangeOnFirstSelection={false}
                onChange={item => setState([item.selection])}
                preventSnapRefocus={true}
                ranges={state}
                showDateDisplay={false}
                disabledDates = {disableDates}
                //showSelectionPreview={true}
                /> 
        
    )
}

export default Calendar;