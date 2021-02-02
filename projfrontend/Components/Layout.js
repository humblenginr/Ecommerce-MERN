import React from 'react'
import { Navigation } from './Navigation'

export const Layout = (props) => {
    return (
        <div>
            <Navigation />
            <div className="container-fluid">
                <div className="jumbotron bg-dark text-white text-center">
                    <h2 className="display-4">{props.title}</h2>
                    <p className="lead">{props.desc}</p>
                </div>
                <div className={props.className}>
                {props.children}
                </div>
            </div>
            <footer className="footer bg-dark mt-auto pt-2 fixed-bottom">
                <div className="container-fluid bg-success text-white text-center py-3">
                    <h4>If you have any questions, please feel free to contact us!</h4>
                    <button className="btn btn-warning btn-lg rounded">Contact Us</button>
                </div>
            </footer>
        </div>
    )
}
