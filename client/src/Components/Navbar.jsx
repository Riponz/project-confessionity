import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './Navbar.css'
import SearchIcon from '@mui/icons-material/Search';
import { userContext } from '../App';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import logo from './../assets/confessionity-icon.png'
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import ProfileIcon from '@mui/icons-material/AccountCircle';

function Navbar() {

  const { uid, setUid, setGroups, setEmail, setUsername } = useContext(userContext);

  const navigate = useNavigate()

  const handleLogout = async () => {
    console.log("clicked logout");
    await signOut(auth);
    setUid("");
    setEmail("");
    setUsername("");
    setGroups([])

  };

  const handleSignup = () => {
    navigate("/signup")
  }

  const handleLogin = async () => {

    navigate('/login');
  };

  const handleHome = () => {
    navigate("/")
  }


  return (
    <>
      <div className='w-full z-[10] font-semibold text-lg fixed top-0 display h-[max] py-4 px-10 sm:px-20 flex flex-row justify-between items-center bg-[#B2A4FF]'>
        <div onClick={handleHome} className='w-max flex justify-evenly items-center'>
          <img className='w-[43px] cursor-pointer mx-3' src={logo} alt="confessionity logo" />
          <div className='text-xl font-bold cursor-pointer hidden lg:flex'>confessionity</div>
          {/* <form className='w-[16rem] ml-5 rounded-lg h-8 flex justify-center items-center bg-[#e5e7eb]'>
            <input type="text" required={true} placeholder='search groups...' className='bg-transparent outline-none w-[70%]' />
            <button type='submit'><SearchIcon /></button>
          </form> */}
        </div>
        <div className='hidden lg:flex justify-evenly items-center'>
          <div className={`mx-5 my-4 md:my-0 md:mx-10 hover:text-white h-full cursor-pointer`}><NavLink to='/'>Home</NavLink></div>
          <div className={`mx-5 my-4 md:my-0 md:mx-10 hover:text-white h-full cursor-pointer`}><NavLink to='/groups'>Group</NavLink></div>
          <div className={`mx-5 my-4 md:my-0 md:mx-10 hover:text-white h-full cursor-pointer`}><NavLink to='/profile'>Profile</NavLink></div>
        </div>

        {/* mobile part */}
        <div className='flex justify-evenly items-center lg:hidden'>
          <div className={`mx-5 my-4 md:my-0 md:mx-10 hover:text-white h-full cursor-pointer`}><NavLink to='/'><HomeIcon fontSize='medium' /></NavLink></div>
          <div className={`mx-5 my-4 md:my-0 md:mx-10 hover:text-white h-full cursor-pointer`}><NavLink to='/groups'><GroupsIcon fontSize='medium' /></NavLink></div>
          <div className={`mx-5 my-4 md:my-0 md:mx-10 hover:text-white h-full cursor-pointer`}><NavLink to='/profile'><ProfileIcon fontSize='medium' /></NavLink></div>
        </div>
        <div className=' hidden lg:flex justify-center items-center'>
          {uid ? "" : (<div onClick={handleSignup} className='cursor-pointer mr-5 font-bold'>Signup</div>)}
          <div onClick={uid ? handleLogout : handleLogin} className='bg-[#7f6fd8] cursor-pointer hover:bg-[#6e61bc] px-4 py-2 rounded-xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]'>{uid ? "logout" : "login"}</div>
        </div>
        
        {/* <div className='bg-emerald-500 w-fit h-fit'>{home}</div>
      <div className='bg-emerald-500 w-fit h-fit'>{group}</div>
      <div className='bg-emerald-500 w-fit h-fit'>{profile}</div> */}
      </div>
    </>
  )
}

export default Navbar