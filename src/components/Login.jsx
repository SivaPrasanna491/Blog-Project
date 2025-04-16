import React, {useState} from 'react'
import Button from '../Button'
import Input from '../Input'
import authService from '../appwrite/Auth'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { login as authLogin } from '../Features/AuthSlice'
function Login() {
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const login = async (data) => {
        try {
            setError('');
            const session = await authService.login(data);
            if(session){
                const userData = await authService.getCurrentUser();
                if(userData){
                    dispatch(authLogin(userData))
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message);
        }
    }
  return (
    <>
        <div className='w-full flex justify-center items-center py-10'>
            <div className='w-full max-w-md rounded-lg bg-white flex flex-col justify-center py-8 px-6 mx-auto space-y-1 shadow-lg'>
                <h2 className='text-xl text-gray-600'>Don't have an account? <Link to='/signup'
                className='hover:text-red-600'
                >Signup</Link></h2>
                {error && <h2 className='text-xl text-red-500 mt-8 text-center'>{error}</h2>}
                <form onSubmit={handleSubmit(login)}>
                    <Input
                    type='text'
                    label='Email'
                    className='mb-4'
                    placeholder='Enter Email'
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        }
                    })}
                    />
                    <Input
                    type='password'
                    label='Password'
                    className='mb-4'
                    placeholder='Enter password'
                    {...register("password",{
                        required: true
                    })}
                    />
                    <Button
                    type='submit'
                    children='Login'
                    className='text-black bg-yellow-600'
                    />
                </form>
            </div>
        </div>
    </>
  )
}

export default Login