import React from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';
import logo from "../images/logo192.png"


function NavBar() {
    return (
        <div className="NavBar">
            <div
                style={{
                    paddingLeft: '70px',
                    paddingRight: '50px',
                    marginTop: "5px",
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    fontSize: 30,
                    letterSpacing: '1px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}
                >
                <img src={logo} alt="logo" width={45} height={35}/>
                FV
            </div>
            <div className="nav-bar">
                <NavLink
                    className="nav-link"
                    activeClassName="nav-link-active"
                    exact
                    to="/">Home
                </NavLink>

                <NavLink
                    className="nav-link"
                    activeClassName="nav-link-active"
                    to="/about">About
                </NavLink>
            </div>
        </div>
    )
}

export default NavBar