import React, { useContext, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addPostUrl } from './../assets/baseUrl'
import axios from 'axios'
import { userContext } from '../App';
import { CircularProgress } from '@mui/material';

function Post() {

    const { setReload, reload, uid, username } = useContext(userContext);

    const [content, setContent] = useState('')
    const [topic, setTopic] = useState('')
    const [loading, setloading] = useState(false)
    const notify = (msg) => toast(msg, {
        theme: "light"
    });


    const handleSend = async () => {
        setloading(true);
        if (!content) {
            notify("write content before you post")
            setloading(false);
            return
        }
        try {
            const isAbusive = await axios.post("http://127.0.0.1:5000/sentiment", {
                text: content
            })
            console.log(isAbusive.data)
            if (isAbusive.data !== 'Negative') {
                const { data } = await axios.post(addPostUrl, {
                    username: username,
                    uid: uid,
                    content: content,
                    topic: topic
                })
                setTopic("")
                setContent("")
                // console.log(res, " post")
                setReload(!reload)
                notify(data.message)
            } else {
                notify("Abusive content!")
                setloading(false)
                return;
            }
        } catch (e) {
            console.log(e)
        }
        setloading(false);

    }



    return (
        <>
            <section className='w-full rounded-lg my-1 flex flex-col justify-evenly items-center bg-white py-6'>
                <ToastContainer />
                <textarea onChange={(e) => { setContent(e.target.value) }} value={content} spellCheck autoCorrect={true} autoComplete={false} className='bg-[#e5e7eb] outline-none rounded-lg w-[80%] p-4 mb-3' placeholder='your content goes here...' rows={5} />
                {/* <input type="text" className='bg-blue-300 w-[80%]' placeholder='type your content...' /> */}
                <div className="tags w-[80%] flex flex-col lg:flex-row justify-evenly items-center">
                    <input onChange={(e) => { setTopic(e.target.value) }} value={topic} type="text" className='bg-[#e5e7eb] outline-none rounded-lg w-full lg:w-[90%] p-3' placeholder='tags ( max 3 tags separated by spaces)' />
                    <div className='cursor-pointer w-full lg:w-max flex justify-center bg-gradient-to-r from-violet-200 to-indigo-100 rounded-lg m-3 lg:m-0 lg:ml-3 p-3 items-center' onClick={handleSend}>
                        {loading ? (
                            <CircularProgress thickness={6} size={25} sx={{
                                color: "#7F6FD8"
                            }} />
                        ) : (
                            <SendIcon />
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Post