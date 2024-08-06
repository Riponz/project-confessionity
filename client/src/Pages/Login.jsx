import React, { useContext, useState } from 'react'
import GoogleSvg from './../assets/google-48.svg'
import { Link, useNavigate } from 'react-router-dom';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebaseConfig';
import { userContext } from '../App';
import { userUrl, adduser } from '../assets/baseUrl';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import {
    uniqueNamesGenerator,
    adjectives,
    colors,
    animals,
} from "unique-names-generator"


function Login() {
    const [visible, setVisible] = useState(false)
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [userr, setUserr] = useState()
    const [errorr, setErrorr] = useState()

    const navigate = useNavigate();
    const pattern = /auth\/(.*)/

    const notify = (msg) => toast.error(msg, {
        theme: "light"
    });

    const { setUid, uid, username, email, setEmail, setUsername } = useContext(userContext);

    const handleLogin = async (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(
            auth,
            loginEmail,
            loginPassword
        )
            .then(async (data) => {
                console.log(data.user.uid)
                const res = await axios.get(`${userUrl}?uid=${data.user.uid}`)
                setUserr(res.data)
                setUid(res.data.id)
                setEmail(res.data.email)
                setUsername(res.data.username)
                navigate("/")
            })
            .catch(error => {
                notify(error.code.match(pattern)[1])
            })

    };

    const googleLogin = async () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const uid = result.user.uid;
                const randomName = uniqueNamesGenerator({
                    dictionaries: [adjectives, colors, animals],
                })
                console.log(randomName)
                console.log("check")

                // //////////////////////////////////////////////////////////////////
                axios.get(`${userUrl}?uid=${uid}`)
                    // console.log(res.data, " res check")
                    // setUserr(res.data)
                    .then(data => {
                        console.log(data, "datatata")
                        if (data.data.status === "error") {
                            console.log("equal to error")
                            // notify(res.data.message);
                            axios.post(adduser, {
                                email: result.user.email,
                                uid: uid,
                                username: randomName
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
        <>
            <div className='flex justify-center items-center w-[100%] h-[99vh]'>
                <ToastContainer />
                <div className='bg-white shadow-2xl w-[20rem] rounded-lg h-max p-5 flex flex-col justify-center items-center '>
                    <div className='font-bold text-4xl my-3'>Login</div>
                    <div className='font-bold mt-4'>Hi! welcome back 👋</div>
                    <form action="" className='flex flex-col justify-center my-3 w-full h-max py-2 items-center'>
                        <input className='bg-transparent border-b-2 border-[#b2a4ff] my-3 py-2 w-[100%] outline-none' type="text" required="true" placeholder='email' name="" id="" onChange={e => { setLoginEmail(e.target.value) }} />
                        <div className="pass flex justify-center h-min  my-3  border-b-2 border-[#b2a4ff] items-center w-[100%]">
                            <input className='bg-transparent my-3 py-1 w-[100%] outline-none' type={visible ? "text" : "password"} required="true" placeholder='password' name="" id="" onChange={e => { setLoginPassword(e.target.value) }} />
                            <div onClick={() => { setVisible(!visible) }} className="visibility">{visible ? <VisibilityIcon /> : <VisibilityOffIcon />}</div>
                        </div>
                        {console.log("uid: " + uid)}
                        {console.log("email: " + email)}
                        {console.log("Username: " + username)}
                        {/* <input className='bg-transparent border-b-2 border-[#b2a4ff] my-4 py-2 w-[90%] outline-none' type="password" required="true" placeholder='confirm password' name="" id="" /> */}
                        <button onClick={handleLogin} type='submit' className='py-1 px-3 my-1 flex justify-center items-center bg-gradient-to-r from-violet-300 to-violet-500 text-white rounded-lg'>login</button>
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
                    <div className='text-xs'>dont have an account? <span className='text-[#8d80dc] underline font-bold'><Link to='/signup'>signup</Link></span></div>
                </div>
            </div>
        </>
    )
}
export default Login