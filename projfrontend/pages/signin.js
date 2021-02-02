import React from 'react'
import { Layout } from '../Components/Layout';
import { SignForm } from '../Components/SignForm';

 const signin = () => {
    return (
        <Layout title="Sign In">
            <div className="d-flex justify-content-center">
            <SignForm isSignin="true"/>
            </div>
        </Layout>
    )
}

export default signin;
