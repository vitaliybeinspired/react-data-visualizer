import React from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';

function NavBar() {
    return (
        <div className="NavBar">
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
                    to="/map">Map
                </NavLink>
            </div>
        </div>
    )
}

export default NavBar