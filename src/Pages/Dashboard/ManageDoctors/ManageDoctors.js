import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const ManageDoctors = () => {
    const [deletingDoctor, setDeletingDoctor] = useState(null);
    const { data: doctors = [], isLoading } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/doctors', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                const data = await res.json();
                return data;
            }
            catch (err) {
                console.log(err)
            }
        }
    })
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h1>Manage</h1>



            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Specialty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            doctors?.map((doctor, i) => <tr key={doctor._id}>
                                <th>{i + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={doctor.image} alt='/' />
                                        </div>
                                    </div>
                                </td>
                                <td>{doctor.name}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.specialty}</td>
                                <td>
                                    <label onClick={() => setDeletingDoctor(doctor)} htmlFor="confirmation-modal" className="btn btn-sm btn-err">open modal</label>

                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>

            {
                deletingDoctor && <ConfirmationModal title={`Are you sure You Want to Delete?`}
                    message={`If You delete ${deletingDoctor.name}. It cannot be undone.`}
                    setDeletingDoctor={setDeletingDoctor}
                ></ConfirmationModal>
            }

        </div>
    );
};

export default ManageDoctors;