import './App.css'
import Navbar from './Components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Groups from './Pages/Groups'
import Profile from './Pages/Profile'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import React, { createContext, useEffect, useState } from 'react'
import { userGroup } from './assets/baseUrl'
import axios from 'axios'
import GroupPage from './Components/GroupPage'
import ShowNavBar from './Components/ShowNavBar'
import NotFound from './Components/NotFound'
import Founder from './Pages/Founder'

export const userContext = createContext()

function App() {

  const [uid, setUid] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [reload, setReload] = useState(false)
  const [groups, setGroups] = useState()
  const [toggle, setToggle] = useState([])



  return (
    <userContext.Provider value={{ toggle: toggle, setToggle: setToggle, groups: groups, setGroups: setGroups, reload: reload, setReload: setReload, uid: uid, username: username, email: email, setUid: setUid, setUsername: setUsername, setEmail: setEmail }}>
      <>
        <div className='w-[100vw] h-[100vh] flex justify-center bg-gradient-to-r from-violet-200 to-indigo-100 items-center'>
          <ShowNavBar>
            <Navbar />
          </ShowNavBar>
          <div className="main flex justify-center items-center overflow-hidden h-full w-full sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] min-[1440px]:w-[1440px]">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/login' element={<Login />} />
              <Route path='/founder' element={<Founder />} />
              <Route path='groups' element={<Groups />} />
              <Route path='group/:gid' element={<GroupPage />} />
              <Route path='profile' element={<Profile />} />
              <Route path="*" element={<NotFound />} /> 
            </Routes>
          </div>
        </div>

      </>
    </userContext.Provider >
  )
}

export default App
