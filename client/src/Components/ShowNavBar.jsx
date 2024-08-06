import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function ShowNavBar({ children }) {

    const [showNav, setShowNav] = useState(false)

    const location = useLocation()
    // console.log(location)

    useEffect(() => {
        if (location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/founder") {
            setShowNav(false)
        } else {
            setShowNav(true)
        }
    }, [location])


    return (
        <>{showNav && children}</>
    )
}

export default ShowNavBar