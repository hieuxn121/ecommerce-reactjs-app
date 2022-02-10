import React, {useState, useEffect} from 'react'
import {NavLink} from 'react-router-dom'
import classes from './index.module.css'
import { FaCartPlus, FaUserAlt } from 'react-icons/fa';
const Header = () => {
    const [token, setToken] = useState('')
    useEffect(() => {
        console.log(token)
        if(localStorage.getItem('token')){
            const token = localStorage.getItem('token')
            setToken(token)
        }
    },[])
    const handlerLogout = () => {
        localStorage.removeItem('token')
        setToken('')
    }
    return (
        <div>
           <nav className="navbar navbar-expand-lg ">
            <a className="navbar-brand" href="#">
                <img src = "https://react-course-comfy-sloth-store.netlify.app/static/media/logo.221f6b13.svg"/>
            </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item active" >
                        <NavLink className = {`nav-link ${classes.menuItem}`} to="/">HOME <span className="sr-only">(current)</span></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className = {`nav-link ${classes.menuItem}`} to="/about">ABOUT</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className = {`nav-link ${classes.menuItem}`} to="/products">PRODUCTS</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className = { token === '' ? `nav-link ${classes.menuItem} ${classes.nonActive}`: `nav-link ${classes.menuItem} ${classes.Active}`} to="/checkout">CHECK OUT</NavLink>
                    </li>
                    </ul>
                    <div className = {`menu-right ${classes.menuRight}`} style = {{fontSize: "20px", paddingRight: "30px"}}>
                        <NavLink className = {`nav-link ${classes.menuItem}`} to = "/cart">Cart <FaCartPlus /></NavLink>
                        { token === '' ? 
                            <NavLink className = {`nav-link ${classes.menuItem}`} to = "/login">Login <FaUserAlt/> </NavLink>:
                            <span onClick = {handlerLogout} className = {`nav-link ${classes.menuItem}`}>Logout <FaUserAlt/></span>
                        }
                       
                    </div>
                </div>
            </nav> 
        </div>
    )
}

export default Header
