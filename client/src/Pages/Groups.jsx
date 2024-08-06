import React, { useContext, useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Card from '../Components/Card';
import GroupCard from '../Components/GroupCard';
import Navbar from '../Components/Navbar';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userContext } from '../App';
import { addGroupMember, createGroup, getAllGroups, getUsername, userGroup } from './../assets/baseUrl'
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import GroupSearch from '../Components/GroupPage';
import { useNavigate, useLocation } from 'react-router-dom';
import imgNoGroups from './../assets/imgNoGroups.png'
import imgsearch from './../assets/search.png'
import imgNoGroupsFound from './../assets/noGroupsFound.png'
import imgLogin from './../assets/login.png'
import { CircularProgress } from '@mui/material';


function Groups() {
  const str = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium laudantium iure eum reiciendis eius dicta voluptatum officiis suscipit, nobis maiores libero quasi. Iste facere provident eligendi deleniti quod exercitationem quas in sapiente saepe et vero ullam officiis praesentium, vel dolores, laborum odio architecto doloremque autem sint fuga optio ipsa. Ipsam."
  const [gname, setGname] = useState("")
  const [gdesc, setGdesc] = useState("")
  const [gtopic, setGtopic] = useState("")
  const [open, setOpen] = useState(false)
  const [join, setJoin] = useState(false)
  const [allGroups, setAllGroups] = useState()
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [load, setLoad] = useState(false)


  const { uid, username, groups, setGroups, setUid, setEmail, setUsername, email } = useContext(userContext);

  const navigate = useNavigate()
  const location = useLocation()

  const handleSpecificGroup = (gid) => {
    navigate('/group/' + gid)
  }

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      setUid(currentUser.uid)
      setEmail(currentUser.email)
      const res = await axios.get(`${getUsername}${currentUser.uid}`)
      setUsername(res.data)
      const fetchGroups = async () => {
        const url = `${userGroup}${uid}`
        const res = await axios.get(`${userGroup}${currentUser.uid}`)
        setGroups(res.data)
      }
      fetchGroups()
    })

  }, [location, join])

  // useEffect(() => {

  // }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    setLoad(true)
    setLoading(true)
    setTimeout(() => {
    }, 1000000)
    axios.get(`${getAllGroups}${search}`)
      .then((groups) => {
        setAllGroups(groups.data)
        setLoad(false)
      })
      .catch(err => {
        notify(err.message)
      })
    setLoading(false)
    setLoading(false)
  }


  const notify = (msg) => toast.success(msg, {
    theme: "light"
  });

  const handleGroup = async () => {
    // if(!gname || !gdesc){
    //   notify("Please fill all the fields")
    //   return;
    // }
    const res = await axios.post(createGroup, {
      uid: uid,
      name: gname,
      bio: gdesc,
      topic: gtopic
    })
    setJoin(!join)
    notify(res.data.message)
    setOpen(!open)
  }

  const handleJoin = (id) => {
    axios.post(addGroupMember, {
      uid: uid,
      gid: id
    }).then(data => {
      console.log(data)
      setJoin(!join)
      navigate('/group/' + id)
    }).catch(err => {
      console.log(err)
    })
  }



  return (
    <>
      {uid ? (<button onClick={() => { setOpen(!open) }} className='fixed bottom-10 right-10 border-2 rounded-lg py-3 px-2 border-[#b2a4ff] bg-[#b2a4ff] hover:bg-[#897ec5] transition-all ease-in duration-200'>Create Group <AddCircleOutlineIcon /></button>) : ""}
      {/* <Navbar /> */}
      <ToastContainer />
      <div className={`h-full w-full flex justify-center items-center fixed top-0 z-50 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 transition-all ease-in duration-500 ${open ? "" : "hidden"}`}>
        <div className='w-[25rem] h-max py-6 relative bg-white rounded-lg flex flex-col justify-center items-center shadow-2xl'>
          <CloseIcon onClick={() => { setOpen(!open) }} className='absolute top-4 right-4' />
          <div className='font-bold text-2xl'>Create Group</div>
          <div className='w-[100%] h-max px-4 my-4'><input onChange={(e) => { setGname(e.target.value) }} className='w-full outline-none border-2 border-[#b2a4ff] rounded-lg p-2' type="text" placeholder='name of the group...' name="" id="" /></div>
          <div className='w-[100%] h-max px-4 my-4'>
            <input onChange={(e) => { setGdesc(e.target.value) }} className='w-full outline-none border-2 border-[#b2a4ff] rounded-lg p-2' type="text" placeholder='description...' name="" id="" maxLength="120" />
            <div className='text-xs font-bold'>*not more than 120 characters</div>
          </div>
          <div className='w-[100%] h-max px-4 my-4'>
            <input onChange={(e) => { setGtopic(e.target.value) }} className='w-full outline-none border-2 border-[#b2a4ff] rounded-lg p-2' type="text" placeholder='topics' name="" id="" />
            <div className='text-xs font-bold'>*maximum 3</div>
          </div>
          <button onClick={handleGroup} className='py-2 px-2 text-lg bg-gradient-to-r from-violet-300 to-violet-500 text-white rounded-lg'>create</button>
        </div>
      </div>


      <section className='w-full mt-[10.5rem] lg:mt-20 h-[88vh] hidden lg:flex justify-center py-1 items-center'>
        <div className='w-full h-full bg-white basis-1/3 m-3 py-5 px-3 rounded-lg flex flex-col justify-start items-center'>


          <div className='w-full h-full flex flex-col px-4 justify-start items-center  overflow-scroll no-scrollbar'>
            <div className='font-bold text-2xl text-[#b2a4ff]'>My groups</div>


            {
              uid ? (
                groups ?
                  (
                    groups?.length ? (
                      groups?.map(group => {
                        return (<div className='w-full bg-gradient-to-r from-violet-100 to-indigo-100 border-2 border-[#cbc3fa] shadow-xl rounded-lg my-2' onClick={() => { handleSpecificGroup(group._id) }}>
                          <GroupCard groupname={group.name} no={group.members.length} desc={group.bio} />
                        </div>)
                      })
                    ) : (<div className='p-5 w-full h-full flex flex-col justify-center items-center'>
                      <img className='opacity-95 grayscale' src={imgNoGroups} alt="" width={220} />
                      <div className='font-semibold text-xl mt-2 italic text-slate-500'>No Groups Joined!</div>
                    </div>)


                  ) : (
                    <div className='w-full bg-gradient-to-r from-violet-100 to-indigo-100 border-2 border-[#cbc3fa] shadow-lg rounded-lg my-2' >
                      <GroupCard />
                    </div>
                  )
              ) : (
                ////////////////////////////////////////////////////////////////////
                <div className='p-5 w-full h-full flex flex-col justify-center items-center'>
                  <img className='opacity-85 grayscale' src={imgLogin} alt="" width={220} />
                  <div className='font-semibold text-xl mt-2 italic text-slate-500'>Login To View!</div>
                </div>
              )
            }

            <MoreHorizIcon />

          </div>
        </div>



        <div className='w-full h-[88vh] px-20 basis-2/3 flex flex-col justify-start items-center overflow-scroll no-scrollbar'>

          <div className="search w-full h-full bg-white rounded-lg my-1 py-5 px-3 flex flex-col justify-start items-center overflow-scroll no-scrollbar">
            <form className='w-[16rem] ml-5 rounded-lg h-8 flex justify-center items-center bg-[#e5e7eb]'>
              <input type="text" required={true} placeholder='search groups...' onChange={(e) => { setSearch(e.target.value) }} className='bg-transparent outline-none w-[70%]' />
              <button type='submit' className='flex justify-center items-center' onClick={handleSearch}> {load ? (<CircularProgress thickness={6} size={20} sx={{
                color: "#7F6FD8"
              }} />) : (<SearchIcon />)} </button>
            </form>

            {
              loading ? (<div className='w-full  border-2 border-[#cbc3fa] shadow-lg rounded-lg my-2 p-2 flex justify-center items-center'>
                <GroupCard />
                <button className='bg-[#b2a4ff] rounded-lg py-2 px-4'>Join</button>
              </div>) : (
                (allGroups != 0) ? (allGroups?.map(group => {
                  return (<div className='w-full  border-2 border-[#cbc3fa] shadow-lg rounded-lg my-2 p-2 flex justify-center items-center'>
                    <GroupCard groupname={group.name} no={group.members.length} desc={group.bio} />
                    {console.log(uid, " uid")}
                    {console.log(group.members, " members")}
                    {uid ? (group?.members?.includes(uid) ? ("") : (
                      <button onClick={() => { handleJoin(group._id) }} className='bg-[#b2a4ff] rounded-lg py-2 px-4'>Join</button>
                    )) : ("")
                    }


                  </div>)
                })) : (
                  <div className='p-5 w-full h-full flex flex-col justify-center items-center'>
                    <img className='opacity-85 grayscale' src={imgNoGroupsFound} alt="" width={220} />
                    <div className='font-semibold text-xl mt-2 italic text-slate-500'>No Groups Found!</div>
                  </div>
                )
              )
            }



            {allGroups ? (<div></div>) : (
              <div className='p-5 w-full h-full flex flex-col justify-center items-center'>
                <img className='opacity-95 grayscale' src={imgsearch} alt="" width={200} />
                <div className='font-semibold text-xl mt-2 italic text-slate-500'>Search Groups!</div>
              </div>
            )}


          </div>

        </div>



        {/* {uid ? (<button onClick={() => { setOpen(!open) }} className='fixed bottom-10 right-10 border-2 rounded-lg py-3 px-2 border-[#b2a4ff] bg-[#b2a4ff] hover:bg-[#897ec5] transition-all ease-in duration-200'>Create Group <AddCircleOutlineIcon /></button>) : ""} */}

      </section>


      {/* //mobile section */}

      <section className='flex flex-col lg:hidden w-full mb-4 mt-[13rem] md:mt-[11rem] lg:mt-20 h-full justify-start py-1 items-center overflow-scroll no-scrollbar'>
        <div className='w-[95%] h-max flex flex-col justify-center items-center'>

          <div className="search w-full h-max bg-white rounded-lg my-1 py-5 pt-8 pb-8 px-3 flex flex-col justify-center items-center overflow-scroll no-scrollbar">
            <form className='w-[90%] md:w-[90%] p-5 rounded-lg h-8 flex justify-center items-center bg-[#e5e7eb]'>
              <input type="text" required={true} placeholder='search groups...' onChange={(e) => { setSearch(e.target.value) }} className='bg-transparent p-5 outline-none w-full' />
              <button type='submit' onClick={handleSearch}><SearchIcon /></button>
            </form>


            {
              loading ? (<div className='w-full  border-2 border-[#cbc3fa] shadow-lg rounded-lg my-2 p-2 flex justify-center items-center'>
                <GroupCard />
                <button className='bg-[#b2a4ff] rounded-lg py-2 px-4'>Join</button>
              </div>) : (
                (allGroups != 0) ? (allGroups?.map(group => {
                  return (<div className='w-full  border-2 border-[#cbc3fa] shadow-lg rounded-lg my-2 p-2 flex justify-center items-center'>
                    <GroupCard groupname={group.name} no={group.members.length} desc={group.bio} />
                    <button onClick={() => { handleJoin(group._id) }} className='bg-[#b2a4ff] rounded-lg py-2 px-4'>Join</button>
                  </div>)
                })) : (
                  <div className='w-max h-max flex justify-center items-center text-xl p-4 font-bold'>no groups found...</div>




                  ////////////////////////////////////
                )
              )
            }


            {/* 
            {allGroups ? (<div></div>) : (
              <div className='p-5 w-full h-full flex flex-col justify-center items-center'>
                <img className='opacity-95 grayscale' src={imgsearch} alt="" width={220} />
                <div className='font-semibold text-xl mt-2 italic text-slate-500'>Search Groups!</div>
              </div>
            )} */}


          </div>

        </div>

        <div className='w-[95%] h-max py-5 rounded-lg flex flex-col justify-start items-center overflow-scroll no-scrollbar'>


          <div className='w-full h-[40rem] flex flex-col justify-start items-center overflow-scroll no-scrollbar'>
            <div className='font-bold h-max text-2xl text-[#b2a4ff]'>My groups</div>
            {
              uid ? (
                groups ?
                  (
                    groups?.length ? (
                      groups?.map(group => {
                        return (
                          <div className='w-full bg-gradient-to-r from-violet-100 to-indigo-100 border-2 border-[#cbc3fa] shadow-lg rounded-lg my-2' onClick={() => { handleSpecificGroup(group._id) }}>
                            <GroupCard gid={group._id} groupname={group.name} no={group.members.length} desc={group.bio} />
                          </div>
                        )
                      })
                    ) : (
                      <div className='p-5 w-full h-full flex flex-col justify-center items-center'>
                        <img className='opacity-95 z-10 grayscale' src={imgNoGroups} alt="" width={220} />
                        <div className='font-semibold text-xl mt-2 italic text-slate-500'>No Groups Joined!</div>
                      </div>
                    )

                  ) : (
                    <div className='w-full bg-gradient-to-r from-violet-100 to-indigo-100 border-2 border-[#cbc3fa] shadow-lg rounded-lg my-2' >
                      <GroupCard />
                    </div>
                  )
              ) : (<div></div>)
            }


            <MoreHorizIcon />

          </div>
        </div>


      </section>
    </>
  )
}

export default Groups