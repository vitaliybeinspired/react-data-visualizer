import React from 'react';
import './Title.css';
import { NavLink } from 'react-router-dom';



function Title() {
    return (
        <div className="Title">
            <h1>CFV</h1>    
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

                <NavLink
                    className="nav-link"
                    activeClassName="nav-link-active"
                    to="/exportdata">ExportData
                </NavLink>
            </div>
        </div>
    )
}

export default Title