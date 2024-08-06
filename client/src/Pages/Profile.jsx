import React, { useContext, useEffect, useState } from 'react'
import Card from '../Components/Card'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Components/Navbar'
import axios from 'axios'
import { deletePost, getUserPost, getUsername, postUrl } from './../assets/baseUrl'
import { userContext } from '../App'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../../firebaseConfig'
import { useNavigate } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';
import imgLogin from './../assets/login.png'

function Profile() {

  const navigate = useNavigate()

  const [posts, setPosts] = useState()
  const [deleted, setDeleted] = useState(false)

  const { uid, username, setUid, setEmail, setUsername, email } = useContext(userContext);

  const notify = (msg) => toast(msg, {
    theme: "light"
  });

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      setUid(currentUser.uid)
      setEmail(currentUser.email)
      const res = await axios.get(`${getUsername}${currentUser.uid}`)
      setUsername(res.data)
      console.log(res.data)
    })
  }, [])

  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.post(getUserPost, {
        uid: uid,
      })
      console.log("test")
      setPosts(res.data)
    }
    getPosts()
  }, [uid, deleted, posts])

  const handleDelete = (id) => {
    axios.delete(`${deletePost}${id}`)
      .then((res) => {
        notify(res.data.message)
        setDeleted(!deleted)
      }).catch((error) => {
        console.log(error)
      })
  }

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

  const handlePost = () => {
    navigate("/")
  }

  return (
    <>
      {/* <Navbar /> */}
      <ToastContainer />
      <section className='w-full h-[88vh] mb-4 lg:mb-0 mt-[7rem] md:mt-[5rem] lg:mt-20 py-1 flex flex-col lg:flex-row justify-start items-center'>
        <div className='w-[95%] rounded-lg p-4 h-full flex flex-col justify-evenly items-center bg-white my-1 basis-1/3 '>

          {uid ? (<div className='w-full h-full basis-2/3 flex flex-col justify-evenly items-center'>
            <div className="info w-full py-4 flex justify-evenly items-center">
              <div className='font-bold text-black text-base sm:font-bold lg:font-bold sm:text-base lg:text-2xl'>{username}</div>
            </div>

            <div className="email text-base font-bold sm:text-lg py-4 sm:font-bold lg:text-xl lg:font-bold">{email}</div>
          </div>) : ""}

          <div className='flex lg:hidden justify-center items-center'>
            {
              uid ? ("") : (
                <div onClick={handleSignup} className='cursor-pointer mr-5 py-4 font-bold'>Signup</div>
              )
            }
            <div onClick={uid ? handleLogout : handleLogin} className='bg-[#7f6fd8] py-4 cursor-pointer hover:bg-[#6e61bc] px-4 py-2 rounded-xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]'>
              {
                uid ? "logout" : "login"}
            </div>
          </div>

          <div className='text-lg sm:text-lg lg:text-xl font-bold lg:font-bold basis-1/3 flex flex-col py-4 sm:flex-row md:flex-col xl:flex-row justify-center items-center'> <div>Your Anonymity,</div><div>&nbsp;Our <span className='text-[#B2A4FF]'>&nbsp;Responsibility</span></div></div>


        </div>



        <div className='userpost w-[95%] h-[87vh] lg:px-20 basis-2/3 overflow-scroll no-scrollbar'>
          <div className='w-full h-max pb-5 rounded-lg'>

            {uid ? (

              posts ? ((posts.length == 0) ? (
                <div className='w-full h-[40rem] flex flex-col justify-center items-center'>
                  <div className='text-lg font-bold'>You haven't posted anything...</div>
                  <div onClick={handlePost} className='text-base font-medium text-[#8d79ff] cursor-pointer underline'>create yout first post <LaunchIcon /></div>
                </div>
              ) : (
                posts?.slice(0).reverse().map((post) => {
                  return (
                    <div className='w-full bg-white border-2 border-[#cbc3fa] shadow-lg rounded-lg mb-2 p-3 flex flex-col md:flex-row justify-center items-center'>
                      <Card key={post._id} username={post.username} content={post.content} time={post.date} id={post._id} />
                      <button onClick={() => { handleDelete(post._id) }} className='bg-red-500 rounded-lg py-2 px-4 w-[95%] md:w-max'>Delete</button>
                    </div>
                  )
                })))


                : (
                  <>
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                  </>
                )


            ) : (
              <div className='p-5 w-full h-full flex flex-col justify-center items-center'>
                <img className='opacity-85 grayscale' src={imgLogin} alt="" width={300} />
                <div className='font-semibold text-xl mt-2 italic text-slate-500'>Login To View!</div>
              </div>
            )
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default Profile