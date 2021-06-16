import React from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';
import Logo from "../images/logo.png";

function NavBar() {
    return (
        <div className="NavBar">
            <div className="nav-bar">
            <img src={Logo} alt="logo" style={{width:'50px', display:'inline-block'}} />
                <NavLink
                    style={{marginLeft:'50px'}}
                    className="nav-link"
                    activeClassName="nav-link-active"
                    exact
                    to="/">Home
                </NavLink>

                <NavLink
                    className="nav-link"
                    activeClassName="nav-link-active"
                    to="/map">Map
                </NavLink>
            </div>
        </div>
    )
}

export default NavBar