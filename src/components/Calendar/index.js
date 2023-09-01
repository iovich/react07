import React, { useState, useEffect } from 'react';
import styles from './Calendar.module.scss';

function Calendar() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentTime, setCurrentTime] = useState(new Date());

    const handlePrevMonth = () => {
        const newDate = new Date(selectedDate);
        newDate.setMonth(newDate.getMonth() - 1);
        setSelectedDate(newDate);
    };

    const handleNextMonth = () => {
        const newDate = new Date(selectedDate);
        newDate.setMonth(newDate.getMonth() + 1);
        setSelectedDate(newDate);
    };

    const isToday = (date) => {
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    };

    const getDaysInMonth = () => {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 0);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const daysInMonth = [];

        const lastDayOfPrevMonth = new Date(year, month, 0).getDate();
        for (let i = firstDayOfMonth.getDay() - 1; i >= 0; i--) {
            const day = new Date(year, month - 1, lastDayOfPrevMonth - i);
            daysInMonth.push(day);
        }

        for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
            const day = new Date(year, month, i);
            daysInMonth.push(day);
        }

        for (let i = 1; daysInMonth.length % 7 !== 0; i++) {
            const day = new Date(year, month + 1, i);
            daysInMonth.push(day);
        }

        return daysInMonth;
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth();
        return (
            <div className={styles.calendar}>


                <div className={styles.calendar__info}>
                    <p className={styles.__info__time}>
                        {currentTime.toLocaleTimeString('ua-UA', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </p>
                    <p className={styles.__info__date}>
                        {currentTime.toLocaleDateString('ua-UA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>

                <hr></hr>

                <div className={styles.calendar__header}>
                    <button onClick={handlePrevMonth}>&lt;</button>
                    <div>
                        {new Intl.DateTimeFormat('ua-UA', {
                            year: 'numeric',
                            month: 'long',
                        }).format(selectedDate)}
                    </div>
                    <button onClick={handleNextMonth}>&gt;</button>
                </div>

                <div className={styles.calendar__weekdays}>
                    {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'].map((day, index) => (
                        <div key={index} className={styles.calendar__weekday}>
                            {day}
                        </div>
                    ))}
                </div>

                <div className={styles.calendar__grid}>
                    {daysInMonth.map((day, index) => (
                        <div key={index} className={styles.calendar__cell}>
                            {day && (
                                <span
                                    className={`${styles.calendar__day} 
                                                ${day.getMonth() === selectedDate.getMonth() ? '' : styles.other__month}
                                                ${isToday(day) ? styles.current__day : ''}`}
                                    onClick={() => console.log(day.toLocaleDateString())}
                                >
                                    {day.getDate()}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return renderCalendar();
}
export default Calendar;