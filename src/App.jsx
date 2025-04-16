import { useState,useEffect } from 'react'
import authService from './appwrite/Auth'
import {useDispatch} from 'react-redux'
import {login, logout} from './Features/AuthSlice'
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
function App() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
        if(userData){
            dispatch(login({userData}));
        } else{
            dispatch(logout());
        }
    }).finally(() => setLoading(false))
  }, [])
return !loading?(
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      <main className="flex-grow"> 
        <Outlet />
      </main>
      <Footer />
    </div>
) : null
}

export default App
