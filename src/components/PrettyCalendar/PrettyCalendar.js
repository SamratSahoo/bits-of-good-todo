// Credit: https://github.com/wojtekmaj/react-calendar

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import './PrettyCalendar.less';

export default function PrettyCalendar(props) {
    const [value, onChange] = useState(new Date());
    var dueDate = "";
    return (
        <div className="PrettyCalendar">
            <div className="PrettyCalendar__container">
                <main className="PrettyCalendar__container__content">
                    <Calendar
                        onChange={(value, event) => {
                            dueDate = value.toString()
                            console.log(dueDate);
                        }}
                        showWeekNumbers
                        value={value}
                        className={props.className}
                    />
                </main>
            </div>
        </div>
    );
}