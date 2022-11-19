import { format } from 'date-fns';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../context/AuthProvider';

const BookingModal = ({ treatment, selectedDate, setTreatment, refetch }) => {
    const { user } = useContext(AuthContext);
    const date = format(selectedDate, 'PP');
    const handleBooking = (e) => {
        e.preventDefault();
        const form = e.target;
        const slot = form.slot.value;
        const name = user?.displayName;
        const email = user?.email;
        const phone = form.phone.value;
        const booking = {
            appointmentDate: date,
            treatment: treatment.name,
            patientName: name,
            slot,
            email,
            phone
        }
        console.log(booking);
        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    setTreatment(null);
                    toast.success('Booking Confirmed');
                    refetch();
                }
                else {
                    toast.error(data.message);
                }
            })
    }
    console.log(treatment);
    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{treatment?.name}</h3>


                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10'>
                        <input type="text" value={date} disabled className="input w-full input-bordered " />

                        <select name='slot' className="select select-bordered w-full">

                            {
                                treatment.slots.map((slot, i) => <option key={i} value={slot}>{slot}</option>)
                            }

                        </select>

                        <input name='name' disabled type="text" placeholder={user?.displayName} className="input w-full input-bordered " />
                        <input disabled name='email' type="email" placeholder={user?.email} className="input w-full input-bordered " />
                        <input name='phone' type="text" placeholder="Phone Number" className="input w-full input-bordered " />
                        <input className='btn btn-accent w-full input-bordered ' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;