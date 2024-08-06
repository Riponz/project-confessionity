import React from 'react'
import { useNavigate } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

function GroupCard({ groupname, no, desc, gid }) {


    const str = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam non nulla quod expedita maxime eveniet, doloribus rerum consequatur culpa rem iusto, sequi omnis, tempora officiis molestiae! Impedit, autem dolor perferendis sequi molestias eius alias. Perferendis consequatur harum odio quidem quod illum odit eaque labore delectus voluptatum accusamus laborum, excepturi incidunt."
    return (
        <>
            <div className='w-full h-max my-3 p-5'>
                <div>
                    <div className="name w-full font-bold text-xl">{groupname || < Skeleton height={40} />}</div>
                    {
                        no ? (<div className="members font-medium text-base">{no} members</div>) : (<div className='h-4'></div>)
                    }
                </div>
                <div className="desc">{groupname ? (desc) : (<Skeleton count={2} />)}</div>
                <div className="topics"></div>
            </div>
        </>
    )
}

export default GroupCard