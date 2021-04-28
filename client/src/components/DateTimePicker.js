import React, { useState } from 'react'
import { enGB } from 'date-fns/locale'
import { DateRangePicker, START_DATE, END_DATE } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'

/*Add this as props to not be able to select past days and only from current day

minimumDate={new Date()}

So we can click and drag or type or select date ranges.
Need hour filter?

*/

function DateRangePickerExample() {
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    return (
        <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            minimumLength={1}
            format='MMMMMMMMMM dd, yyyy'
            locale={enGB}
        >
            {({ startDateInputProps, endDateInputProps, focus }) => (
                <div className='date-range'>
                    <input
                        className={'input' + (focus === START_DATE ? ' -focused' : '')}
                        {...startDateInputProps}
                        placeholder='Start date'
                    />
                    <span className='date-range_arrow' />
                    <input
                        className={'input' + (focus === END_DATE ? ' -focused' : '')}
                        {...endDateInputProps}
                        placeholder='End date'
                    />
                </div>
            )}
        </DateRangePicker>
    )
}

export default DateRangePickerExample