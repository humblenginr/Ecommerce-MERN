import React from 'react'
import { Layout } from '../Components/Layout';
import { baseUrl } from '../Utils/baseUrl';

const home = () => {
    return (
        <Layout title="hello" desc="This is home page" >
            <div className="row">
                <div className="col-4">
                    <button className="btn btn-success">Test</button>
                </div>
                <div className="col-4">
                <button className="btn btn-success">Test</button>
                </div>
                <div className="col-4">
                <button className="btn btn-success">Test</button>
                </div>
            </div>
        </Layout>
    )
}
export default home;
