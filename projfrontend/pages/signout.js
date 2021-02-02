import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { axiosInstance } from '../Utils/axios';

 const signout = () => {
     const router = useRouter();
    useEffect(() => {
        if(typeof window !== 'undefined'){
            localStorage.removeItem("jwt");
            axiosInstance.get('signout')
            .then(res => {
                console.log(res);
                router.push('/home')
            })
            .catch(err => console.log(err))
        }
    },[])
    return null;
}
export default signout;
