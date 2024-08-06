import React, { useContext, useEffect, useState } from 'react'
import Card from './Card'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getUsername, specGroup } from '../assets/baseUrl';
import GroupPost from './GroupPost';
import { userContext } from '../App';
import Navbar from './Navbar';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

function GroupPage() {

    const [gDetails, setGDetails] = useState()


    const { setReload, reload, uid, setUsername, setUid, setEmail, username } = useContext(userContext);

    useEffect(() => {
        onAuthStateChanged(auth, async (currentUser) => {
            setUid(currentUser.uid)
            setEmail(currentUser.email)
            const res = await axios.get(`${getUsername}?uid=${currentUser.uid}`)
            setUsername(res.data)
        })

    }, [])

    const params = useParams();
    const id = params.gid;

    useEffect(() => {
        axios.get(`${specGroup}${id}`)
            .then(res => {
                setGDetails(res.data)
            }).catch(err => {
                console.log(err)
            })
    }, [reload])
    return (
        <>
            {/* <Navbar /> */}
            <div className='px-4 w-full h-full'>
                <div className='w-full  bg-white mt-[6.5rem] mb-4 lg:mb-0 md:mt-[5.5rem] lg:mt-20 h-max flex flex-col my-1  rounded-lg py-5 justify-start items-center'>
                    <div className="name font-bold w-full flex justify-center items-center text-xl">{gDetails?.name || <div className='w-[10rem]'><Skeleton height={30} /></div>}</div>
                    {
                        gDetails ? (
                            <div className='members my-2 text-sm'>{gDetails?.members.length} members</div>
                        ) : (<div className='h-5'></div>)
                    }
                    <div className="info text-base mt-1 w-[25rem] text-center">{gDetails?.bio || <Skeleton />}</div>
                </div>
                <GroupPost gid={id} username={username} />

                {/* {
                    gDetails?.posts.map((post) => {
                        return (
                            <Card key={post._id} username={post.username} content={post.content} time={post.date} id={post._id} />
                        )
                    })
                } */}


                {
                    gDetails ? (gDetails?.posts.map((post) => {
                        return (
                            <Card key={post._id} username={post.username} content={post.content} time={post.date} id={post._id} />
                        )
                    })) : (<Card />)
                }


            </div>

        </>
    )
}

export default GroupPage