import React from 'react'
import { baseUrl } from '../Utils/baseUrl';

const home = () => {
    console.log(baseUrl);
    return (
        <div className="text-white">
            Home page
        </div>
    )
}
export default home;
