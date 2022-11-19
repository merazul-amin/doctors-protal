import React, { useState } from 'react';
import chair from '../../../assets/images/chair.png';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
const AppointmentBanner = ({ selectedDate, setSelectedDate }) => {

    return (
        <header className='my-6'>
            <div className="hero mr-6">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={chair} className="max-w-sm lg:w-1/2 rounded-lg shadow-2xl" alt='/' />
                    <div>
                        <DayPicker
                            mode='single'
                            selected={selectedDate}

                            onSelect={(seee) => {

                                if (seee) {
                                    setSelectedDate(seee)
                                }
                            }}
                        />
                    </div>
                </div>
            </div>

        </header>
    );
};

export default AppointmentBanner;