import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ShowComments({ children }) {

    const [showCom, setShowCom] = useState(false)

    const location = useLocation()
    // console.log(location.pathname ,"show comments")

    useEffect(() => {
        if (location.pathname === "/profile" || location.pathname === "/") {
            setShowCom(true)
        } else {
            setShowCom(false)
        }
    }, [location])


    return (
        <>{showCom && children}</>
    )
}

export default ShowComments