import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import {Button, Form, FormControl} from "react-bootstrap"
import { axiosInstance } from '../Utils/axios';
import { setAuthToken } from '../Utils/setAuthToken';

export const SignForm = ({isSignin}) => {
    const router = useRouter();
    const email = useRef();
    const password = useRef();
    const name = useRef();
    
    const formSubmit = () => {

        const data = {
            name: (isSignin ? null : name.current.value),
            email: email.current.value,
            password: password.current.value,
            
        }

        if(isSignin) {
            axiosInstance.post('signin',data)
            .then(res => {
                console.log(res.data.token);
                setAuthToken(JSON.stringify(res.data));
                router.push('/home')

            })
            .catch(err => console.log(err))
        }
        else{
            axiosInstance.post('signup',data)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        }
    }
    return (
        <div>
            <Form style={{color: "white"}} onSubmit={formSubmit} className="p-3">
                {!isSignin && <div>
                    <Form.Label>Name</Form.Label> 
                <FormControl ref={name} type="email" />
                </div>}
                <Form.Label className="mt-3">Email</Form.Label> 
                <FormControl ref={email} type="email" />
                <Form.Label className="mt-3">Password</Form.Label> 
                <FormControl type="password" ref={password} />
                <Button variant="success" onClick={formSubmit} className="mt-3 rounded">{isSignin ? "Sign In" : "Sign Up"}</Button>
            </Form> 
        </div>
    )
}
