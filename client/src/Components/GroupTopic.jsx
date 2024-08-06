import React, { useContext } from 'react'
import GroupCard from './GroupCard'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { userContext } from '../App';
import { useNavigate } from 'react-router-dom';
import imgNoGroups from './../assets/imgNoGroups.png'
import imgLogin from './../assets/login.png'

function GroupTopic() {


  const { uid, groups } = useContext(userContext)

  const navigate = useNavigate()

  const handleSpecificGroup = (gid) => {
    navigate('/group/' + gid)
  }


  return (
    <div className='flex flex-col justify-start items-center px-4 w-full h-full overflow-scroll no-scrollbar'>
      <div className='text-xl font-bold'>My groups</div>


      {
        uid ? (groups ? (
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
              <img className='opacity-95 grayscale' src={imgNoGroups} alt="" width={220} />
              <div className='font-semibold text-xl mt-2 italic text-slate-500'>No Groups Joined!</div>
            </div>
          )

        ) : (
          <div className='w-full bg-gradient-to-r from-violet-100 to-indigo-100 border-2 border-[#cbc3fa] shadow-xl rounded-lg my-2' onClick={() => { handleSpecificGroup(group._id) }}>
            <GroupCard />
          </div>
        )) : (
          <div className='p-5 w-full h-full flex flex-col justify-center items-center'>
            <img className='opacity-85 grayscale' src={imgLogin} alt="" width={220} />
            <div className='font-semibold text-xl mt-2 italic text-slate-500'>Login To View!</div>
          </div>
        )
      }
      <MoreHorizIcon />
    </div>
  )
}

export default GroupTopic