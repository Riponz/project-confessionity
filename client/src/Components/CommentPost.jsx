import React, { useContext, useState } from 'react'
import AddCommentIcon from '@mui/icons-material/AddComment';
import { userContext } from '../App';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addComment } from '../assets/baseUrl';

function CommentPost({ pid }) {
    const [comm, setComm] = useState("")

    const notify = (msg) => toast(msg, {
        theme: "light"
    });

    const { uid, reload, setReload, toggle, username, email, } = useContext(userContext);

    const handleComment = async (e) => {
        e.preventDefault();
        if(!comm){
            notify("Please type your comment")
            return
        }
        const { data } = await axios.post(addComment, {
            pid: pid,
            comment: comm
        })
        setReload(!reload)
        notify(data.message)
        setComm("")
    }


    return (
        <>
            <form className={`w-full h-max p-4 justify-evenly items-center shadow-lg ${uid ? "flex" : "hidden"}`}>
                <input value={comm} required onChange={(e) => { setComm(e.target.value) }} className='w-[80%] p-2 outline-none' type="text" placeholder='type your comment...' />
                <button type='submit' onClick={handleComment}>
                    <AddCommentIcon />
                </button>
            </form>
            {
                uid ? ("") : (<div className='w-full h-max font-bold flex justify-center items-center'>login to add comment</div>)
            }
        </>
    )
}

export default CommentPost