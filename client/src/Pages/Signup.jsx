import React, { useContext, useState } from 'react'
import GoogleSvg from './../assets/google-48.svg'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Link, useNavigate } from 'react-router-dom';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ToastContainer, toast } from 'react-toastify';
import RefreshIcon from '@mui/icons-material/Refresh';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { adduser, userUrl } from '../assets/baseUrl'
import { auth, provider } from './../../firebaseConfig'
import { userContext } from '../App';
import {
    uniqueNamesGenerator,
    adjectives,
    colors,
    animals,
} from "unique-names-generator"



function Signup() {
    const [visible, setVisible] = useState(false)
    const [registerEmail, setRegisterEmail] = useState("")
    const [pass, setPass] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [userDetails, setUserDetails] = useState()
    const [uname, setUname] = useState(uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals],
    }))

    const { setUid, setEmail, setUsername } = useContext(userContext);

    const navigate = useNavigate()
    const pattern = /auth\/(.*)/


    const notify = (msg) => toast.error(msg, {
        theme: "light"
    });

    const notifySuccess = (msg) => toast.success(msg, {
        theme: "light"
    });

    const logout = async () => {
        await signOut(auth);
    };

    const handleRefresh = () => {
        console.log("clicked")
        const randomName = uniqueNamesGenerator({
            dictionaries: [adjectives, colors, animals],
        });
        setUname(randomName)
    }

    const handleEmailSignup = async (e) => {
        e.preventDefault()
        if (!(pass === confirmPass)) {
            notify("password do not match!")
            return
        }
        createUserWithEmailAndPassword(auth, registerEmail, pass)
            .then((user) => {
                setUid(user.user.uid)
                setEmail(user.user.email)
                setUsername(uname)
                axios.post(adduser, {
                    email: user.user.email,
                    uid: user.user.uid,
                    username: uname
                }).then(res => {
                    console.log(res.data)
                    notifySuccess("user created successfully")
                }).catch(err => {
                    notify(err.message)
                })
                navigate("/")

            })
            .catch(error => {
                notify(error.code.match(pattern)[1])
            })
    }


    const googleLogin = async () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const uid = result.user.uid;
                console.log("check")
                console.log(userUrl)

                // //////////////////////////////////////////////////////////////////
                axios.get(`${userUrl}?uid=${uid}`)
                // setUserr(res.data)
                .then(data => {
                        console.log(data.data, " res check")
                        console.log(data, "datatata")
                        if (data.data.status === "error") {
                            console.log("equal to error")
                            // notify(res.data.message);
                            axios.post(adduser, {
                                email: result.user.email,
                                uid: uid,
                                username: uname
                            }).then(data => {
                                // console.log(data, "da tatatatatatatatatatatatatatatat")
                                navigate("/")
                            }).catch(err => {
                                notify(err.message)
                            })
                        } else {
                            console.log("user found")
                            console.log(data)
                            setUid(data.id)
                            setEmail(data.email)
                            setUsername(data.username)
                            navigate("/")
                        }
                    })


            })
            .catch((error) => {
                console.log("error detected")
                console.log(error)
                notify(error)
            });
    }

    return (
        <><ToastContainer />
            <div className='flex justify-center items-center w-[100%] h-[99vh]'>
                <div className='bg-white shadow-2xl w-[20rem] rounded-lg h-max p-5 flex flex-col justify-center items-center '>
                    <div className='font-bold text-4xl my-3'>Signup</div>
                    <form action="" className='flex flex-col justify-center my-3 w-full h-max py-2 items-center'>
                        <input className='bg-transparent border-b-2 border-[#b2a4ff] my-3 py-2 w-[100%] outline-none' type="text" required="true" placeholder='email' name="" id="" onChange={(e) => { setRegisterEmail(e.target.value) }} />
                        <div className="pass flex justify-center h-min  border-b-2 border-[#b2a4ff] items-center w-[100%]">
                            <input value={uname} className='bg-transparent my-3 py-1 w-[90%] outline-none' type='test' required="true" placeholder='username' name="" id="" />
                            <div onClick={handleRefresh} className="refresh"><RefreshIcon /></div>
                        </div>
                        <div className='w-full h-min text-left text-xs font-bold text-slate-400'>*auto-generated username</div>
                        <div className="pass flex justify-center h-min  border-b-2 border-[#b2a4ff] items-center w-[100%]">
                            <input className='bg-transparent my-3 py-1 w-[90%] outline-none' type={visible ? "text" : "password"} required="true" placeholder='password' name="" id="" onChange={(e) => { setPass(e.target.value) }} />
                            <div onClick={() => { setVisible(!visible) }} className="visibility">{visible ? <VisibilityIcon /> : <VisibilityOffIcon />}</div>
                        </div>
                        {/* {console.log(userDetails)} */}
                        <input className='bg-transparent border-b-2 border-[#b2a4ff] my-4 py-2 w-[100%] outline-none' type="password" required="true" placeholder='confirm password' name="" id="" onChange={(e) => { setConfirmPass(e.target.value) }} />
                        <button onClick={handleEmailSignup} type='submit' className='py-1 px-3 pb-2 flex justify-center items-center bg-gradient-to-r from-violet-300 to-violet-500 text-white rounded-lg'>signup</button>
                    </form>
                    <div className='flex text-center text-sm justify-center items-center'>
                        <HorizontalRuleIcon fontSize='small' />
                        <div>or signin via</div>
                        <HorizontalRuleIcon fontSize='small' />
                    </div>
                    <div onClick={googleLogin} className="googlesignup my-3 py-1 px-3 hover:bg-[#b2a4ff] cursor-pointer flex justify-center items-center border-2 border-[#B2A4FF] rounded-xl">
                        <img className='w-8' src={GoogleSvg} alt="" />
                        <div className='font-bold ml-2'>Google</div>
                    </div>
                    <div className='text-xs'>already have an account? <span className='text-[#8d80dc] underline font-bold'><Link to='/login'>login</Link></span></div>
                </div>

            </div>
        </>
    )
}

export default Signup
