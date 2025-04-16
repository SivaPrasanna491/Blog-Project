import React, {useState} from 'react'
import Button from '../Button'
import Input from '../Input'
import authService from '../appwrite/Auth'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../Features/AuthSlice'
function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const {register, handleSubmit} = useForm();
    const signup = async (data) => {
        try {
            setError('');
            const userData = await authService.createAccount(data);
            if(userData){   
                const session = await authService.getCurrentUser();
                if(session){
                    dispatch(login(session));
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message);
        }
    }
  return (
    <div className='w-full  bg-black flex justify-center items-center'>
        <div className='w-full max-w-md rounded-lg bg-white py-8 px-6 mx-auto space-y-4 shadow-lg flex flex-col justify-center'>
            {error && <h2 className='text-xl text-red-500 mt-8 text-center'>{error}</h2>}
            <form onSubmit={handleSubmit(signup)}>
                <Input
                label='Name'
                placeholder='Enter name'
                className='mb-4'
                {...register("name",{
                    required: true
                })}
                />
                <Input
                label='Email'
                placeholder='Enter email'
                className='mb-4'
                {...register("email",{
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label='Password'
                placeholder='Enter password'
                type='password'
                className='mb-4'
                {...register("password",{
                    required:true
                })}
                />
                <Button
                type='submit'
                children='Signup'
                className='text-black bg-yellow-600'
                />
            </form>
        </div>
    </div>
  )
}

export default Signup