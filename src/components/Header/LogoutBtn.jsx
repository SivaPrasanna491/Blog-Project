import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/Auth'
import {logout as authLogout} from '../../Features/AuthSlice'
import { useNavigate } from 'react-router-dom'
function LogoutBtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout()
    .then((userData) => {
      if(userData){
        dispatch(authLogout(userData));
        navigate("/");
      }
    })
  }
  return (
    <button className='px-4 py-2 text-xl bg-yellow-600 text-black rounded-lg transition-transform duration-300 my-auto
    hover:scale-110'
    onClick = {logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn