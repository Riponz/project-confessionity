import React from 'react'

function Tags(props) {
  return (
    <>
    <div className='px-3 py-1 mx-2 w-max block h-max bg-[#e5e7eb] rounded-2xl'>{props.tag}</div>
    </>
  )
}

export default Tags