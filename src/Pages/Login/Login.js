import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import {

    useNavigate,
    useLocation,

} from "react-router-dom";
import useToken from '../../hooks/useToken';

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
    const { logIn } = useContext(AuthContext);
    const [logInError, setLogInError] = useState('');



    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleLogIn = data => {
        logIn(data.email, data.password)
            .then(res => {
                const user = res.user;
                console.log(user);
                setLogInError('');

                fetch(`http://localhost:5000/jwt?email=${data.email}`)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.accessToken) {
                            localStorage.setItem('accessToken', data.accessToken);
                            navigate(from, { replace: true });
                        }
                    })
                    .catch(err => console.log(err));


            })
            .catch(err => {
                console.log(err)
                setLogInError(err.message);
            })

    }
    return (
        <div className='h-[800px] flex justify-center align-middle'>
            <div className='w-96 p-7'>
                <h1 className='text-4xl text-primary text-center'>Log In</h1>

                <form onSubmit={handleSubmit(handleLogIn)}>

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
                                    minLength: { value: 6, message: 'Password must be at least 6 character longer.' }

                                })} className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-error'>{errors.password?.message}</p>}
                        <label className="label"><span className="label-text">Forget Password?</span>
                        </label>
                    </div>
                    <input className='btn btn-accent w-full' value='Log In' type="submit" />
                    <div>
                        {
                            logInError && <p>{logInError}</p>
                        }
                    </div>
                    <p>New to doctors portal? <Link className='text-secondary' to='/signup'>Create New Account</Link> </p>
                    <div className='divider'>Or</div>
                    <button className='w-full btn btn-outline'>Continue With Google</button>
                </form>
            </div>
        </div>
    );
};

export default Login;