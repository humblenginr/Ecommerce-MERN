import React, { useEffect, useState } from 'react'
import { Layout } from '../Components/Layout';
import { isAuthenticated } from '../Utils/isAuthenticated';

const dashboard = () => {
    const [role,setRole] = useState();

    useEffect(() => {
        if(isAuthenticated()) setRole(isAuthenticated().user.role);
    },[])

    if(role === 1){
        return (
            <Layout title="Admin Dashboard">
                <h1>This is admin dashboard</h1>
            </Layout>
        )
    }
    else{
        return (
            <Layout title="User Dashboard">
                <h1>This is user dashboard</h1>
            </Layout>
        )
    }
}
export default dashboard;