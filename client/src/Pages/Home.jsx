import React, { useContext, useEffect, useState } from 'react'
import Card from '../Components/Card'
import GroupTopic from '../Components/GroupTopic'
import TopicCard from '../Components/TopicCard'
import 'react-tagsinput/react-tagsinput.css'
import Post from '../Components/Post'
import { postUrl, userGroup } from './../assets/baseUrl'
import axios from 'axios'
import { userContext } from '../App'
import { getUsername } from './../assets/baseUrl'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebaseConfig'
import { useLocation } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'


function Home() {
    const [posts, setPosts] = useState()
    const [topics, setTopics] = useState([])
    const [search, setSearch] = useState()

    const { uid, reload, toggle, username, email, setGroups, setUsername, setEmail, setUid } = useContext(userContext);

    const location = useLocation()

    onAuthStateChanged(auth, async (currentUser) => {
        setUid(currentUser.uid)
        setEmail(currentUser.email)
        const res = await axios.get(`${getUsername}${currentUser.uid}`)
        setUsername(res.data)
    })

    useEffect(() => {
        const fetchGroups = async () => {
            const res = await axios.get(`${userGroup}${uid}`)
            console.log(res.data, "GET GROUPS HOME")
            setGroups(res.data)
        }
        fetchGroups()
    }, [uid, username, email, location])



    function filterRecordsByTopics(records, searchTopics) {
        return records?.filter(record => {
            return searchTopics.every(searchTopic => {
                return record.topics.some(topic => topic.includes(searchTopic));
            });
        });
    }

    const filteredPosts = filterRecordsByTopics(posts, toggle);




    useEffect(() => {
        // sleep(100000)
        const getPosts = async () => {
            const res = await axios.get(`${postUrl}`)
            setPosts(res.data)
        }
        getPosts()

    }, [reload])

    useEffect(() => {

        const allTopics = [];
        if (posts) {
            for (const row of posts) {

                if (row.topics) {

                    const rowTopics = row.topics;

                    for (const topic of rowTopics) {
                        allTopics.push(topic);
                    }
                }
            }
            const mySet = new Set(allTopics);

            // Convert Set back to array
            setTopics(Array.from(mySet))
        }
    }, [posts])

    console.log(topics, "  topics")


    return (
        <>
            <div className='flex flex-col md:flex-row w-full justify-center mb-4 lg:mb-0 mt-[7rem] md:mt-[5rem] lg:mt-20 items-center h-[88vh]'>

                {/* left side */}
                <div className='hidden lg:flex lg:basis-1/3 flex-col overflow-hidden justify-center items-center h-full mx-1 w-full'>
                    <div className='basis-4/6 bg-white rounded-lg w-full my-1 h-[60%] p-3'><GroupTopic /></div>
                    <div className='basis-2/6 bg-white rounded-lg w-full my-1 h-[40%]  p-5' ><TopicCard topics={topics} /></div>
                </div>
                {/* home section */}
                <div className='lg:basis-2/3 w-[95%] lg:w-full h-full flex flex-col justify-start items-center px-0 lg:px-20 rounded-lg overflow-scroll no-scrollbar'>
                    {uid ? <Post /> : ""}

                    {
                        posts ? (
                            posts?.length ? (filteredPosts?.slice(0).reverse().map((post) => {
                                return (


                                    <div className='w-full'>
                                        <Card key={post._id} comnts={post.comments} delbtn={false} username={post.username} content={post.content} time={post.date} id={post._id} tags={post.topics} />
                                    </div>
                                )
                            })) : (<div className='font-bold text-2xl w-full h-full flex justify-center items-center'>No Posts Yet!</div>)

                        ) : (
                            <>
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                            </>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Home