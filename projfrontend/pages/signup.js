import React from 'react'
import { Layout } from '../Components/Layout';
import { SignForm } from '../Components/SignForm';

 const signup = () => {
    return (
        <Layout title="Sign Up">
            <div className="d-flex justify-content-center">
            <SignForm/>
            </div>
        </Layout>
    )
}

export default signup;
