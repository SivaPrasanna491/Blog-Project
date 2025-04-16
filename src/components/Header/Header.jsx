import React from 'react'
import authService from '../../appwrite/Auth'
import { useSelector } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import LogoutBtn from '../../components/Header/LogoutBtn'
import Logo from '../Logo'
function Header() {
    const navigate = useNavigate();
    const authStatus = useSelector(state => state.auth.status);
    const navItems = [
        {
          name: 'Home',
          slug: "/",
          active: true
        }, 
        {
          name: "Login",
          slug: "/login",
          active: !authStatus,
      },
      {
          name: "Signup",
          slug: "/signup",
          active: !authStatus,
      },
      {
          name: "All Posts",
          slug: "/all-posts",
          active: authStatus,
      },
      {
          name: "Add Post",
          slug: "/add-post",
          active: authStatus,
      },
      ]
    return (
        <div className='sticky top-0 z-[999] w-full h-[75px] bg-gray-900'>
            <div className='flex justify-between items-center px-6 h-full'>
                <Link to="/">
                    <Logo width='w-[220px]'/>
                </Link>
                <ul className='flex gap-6 items-center'>
                {navItems.map((item) => (
                    item.active?(
                        <li key={item.name} className='text-white text-xl transition-transform duration-300 hover:scale-110 cursor-pointer'>
                            <button
                            onClick={() => navigate(item.slug)}
                            >{item.name}</button>
                        </li>
                    ) : null
                ))}
                {authStatus && <li>
                    <LogoutBtn/>
                    </li>}
            </ul>
            </div>
        </div>
    )
}

export default Header