import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import { toast } from "react-hot-toast";


const AddDoctor = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imgHostKey = process.env.REACT_APP_imgbb;
    const navigate = useNavigate();

    const { data: specialties = [], isLoading } = useQuery({
        queryKey: ['appointmentSpecialty'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/appointmentSpecialty');
            const data = await res.json();
            return data;
        }
    })
    const handleAddDoctor = data => {
        console.log(data)
        const image = data.img[0];
        console.log(image);
        const formData = new FormData();
        formData.append('image', image);
        console.log(formData);

        const url = `https://api.imgbb.com/1/upload?key=2a3b04121dfa86ec0c23d00e43315dd4`;


        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.success) {
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        // const doctor = {
        //     name: data.name,
        //     email: data.email,
        //     specialty: data.specialty,
        //     image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
        // }

        // fetch(`http://localhost:5000/doctors`, {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'application/json',
        //         authorization: `bearer ${localStorage.getItem('accessToken')}`
        //     },
        //     body: JSON.stringify(doctor)
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         toast.success('Doctor added');
        //         navigate('/dashboard/manageDoctors')
        //     })

    }


    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='w-96 p-7'>
            <h1>Add Doctor</h1>

            <form onSubmit={handleSubmit(handleAddDoctor)}>

                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Name</span>
                    </label>

                    <input type="text"
                        {...register("name", { required: 'Name is Required.' })}

                        className="input input-bordered w-full max-w-xs" />
                    {errors.name && <p className='text-error'>{errors.name?.message}</p>}
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Email</span>
                    </label>

                    <input type="email"
                        {...register("email", { required: 'Email is Required.' })}

                        className="input input-bordered w-full max-w-xs" />
                    {errors.email && <p className='text-error'>{errors.email?.message}</p>}
                </div>


                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Specialty</span>
                    </label>
                    <select {...register('specialty')} className="select select-secondary w-full max-w-xs">

                        {
                            specialties.map(hi => <option key={hi._id}>{hi.name}</option>)
                        }
                    </select>


                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Photo</span>
                    </label>

                    <input type="file"
                        {...register("img", { required: 'Img is Required.' })}

                        className="input  w-full max-w-xs" />
                    {errors.img && <p className='text-error'>{errors.img?.message}</p>}


                </div>
                <input className='btn btn-accent w-full my-3' value='Add Doctor' type="submit" />

                <div className='divider'>Or</div>
                <button className='w-full btn btn-outline'>Continue With Google</button>
            </form>
        </div>
    );
};

export default AddDoctor;