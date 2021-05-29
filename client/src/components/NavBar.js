import React from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';



function NavBar() {
    return (
        <div className="NavBar">
            <div
                style={{
                    paddingLeft: '24px',
                    paddingRight: '24px',
                    marginTop: "10px",
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    fontSize: 20,
                    letterSpacing: '1px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}
                >
                Electrical Energy Generation
            </div>
            <div className="nav-bar">
                <NavLink
                    className="nav-link"
                    activeClassName="nav-link-active"
                    exact
                    to="/">Map
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