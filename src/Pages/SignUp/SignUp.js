import React from 'react';
import { useContext } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import useToken from '../../hooks/useToken';
const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser } = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState('');
    const navigate = useNavigate();
    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [token] = useToken(createdUserEmail);


    if (token) {
        navigate('/');
    }



    const handleSignUp = value => {

        createUser(value.email, value.password)
            .then(res => {
                const user = res.user;
                toast('User Created Successfully.')
                setSignUpError('');
                updateUser(value.name)
                    .then(() => {
                        saveUser(value.name, value.email)
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => {
                setSignUpError(err.message);
            });
    }

    const saveUser = (name, email) => {
        const user = { name, email };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreatedUserEmail(email);
            })
    }



    return (
        <div>
            <div className='h-[800px] flex justify-center align-middle'>
                <div className='w-96 p-7'>
                    <h1 className='text-4xl text-primary text-center'>Sign Up</h1>

                    <form onSubmit={handleSubmit(handleSignUp)}>

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
                            <label className="label"><span className="label-text">Password</span>
                            </label>
                            <input type="password"

                                {...register("password",
                                    {
                                        required: 'Password is required',
                                        minLength: { value: 6, message: 'Password must be at least 6 character longer.' },
                                        // pattern: { value: /^(?=(?:[^A-Z]*[A-Z]){2})(?=(?:[^0-9]*[0-9]){2}).{8,}$/, message: 'Password Must have uppercase, number and 8 character.' }

                                    })}

                                className="input input-bordered w-full max-w-xs" />
                            {errors.password && <p className='text-error'>{errors.password?.message}</p>}

                        </div>
                        <input className='btn btn-accent w-full my-3' value='Sign Up' type="submit" />
                        <div>
                            {
                                signUpError && <p>{signUpError}</p>
                            }
                        </div>
                        <p>Already have an account? <Link className='text-secondary' to='/login'>Please Login.</Link> </p>
                        <div className='divider'>Or</div>
                        <button className='w-full btn btn-outline'>Continue With Google</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;