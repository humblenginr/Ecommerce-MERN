import React, { useEffect } from 'react'
import {useRouter} from "next/router";
import Link from "next/link"
import {isAuthenticated} from "../Utils/isAuthenticated"



const linkHighlight = (path,pathname) => {
    if(pathname == path){
        return {color: "#2ecc72"}
    }
    else{
        return {color: "#FFFFFF"}
    }
}


export const Navigation = () => {
    const router = useRouter();
    return (
        <div>
            <ul className="nav nav-tabs bg-dark p-2 d-flex justify-content-around">
                <li className="nav-item">
                    <Link href="/home" >
                        <a className="nav-link" style={linkHighlight("/home",router.pathname)}> Home</a>
                    </Link>
                </li>
                {isAuthenticated() ?                 <li className="nav-item">
                    <Link href="/cart"  >
                            <a className="nav-link" style={linkHighlight("/cart",router.pathname)}>Cart</a>
                    </Link>
                </li>
                : null}
                {isAuthenticated() ? isAuthenticated().user.role === 1 
                                ? 
                                <li className="nav-item">
                                <Link href="/dashboard" >
                                       <a className="nav-link" style={linkHighlight("/dashboard",router.pathname)}>A.Dashboard</a> 
                                </Link>
                                </li>
                                :  
                                <li className="nav-item">
                                    <Link href="/dashboard">
                                        <a className="nav-link" style={linkHighlight("/adashboard",router.pathname)}>Dashboard</a>
                                    </Link>
                                </li> : null
            }
            {!isAuthenticated() ?           
            <>
            <li className="nav-item">
                    <Link href="/signup" >
                            <a className="nav-link" style={linkHighlight("/signup",router.pathname)}>SignUp</a>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link href="/signin" >
                            <a className="nav-link" style={linkHighlight("/signin",router.pathname)}>SignIn</a>
                    </Link>
                </li>
                </>
                 : null}
                                 {isAuthenticated() ?                 <li className="nav-item">
                    <Link href="/signout" >
                        <a className="nav-link" style={linkHighlight("/signout",router.pathname)}>SignOut</a>
                    </Link>
                </li>
                : null}
            </ul>
            
        </div>
    )
}
