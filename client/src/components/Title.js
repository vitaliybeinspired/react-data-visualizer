import React from 'react';
import './Title.css';
import { NavLink } from 'react-router-dom';



function Title() {
    return (
        <div className="Title">
            <header>
                <h1>CFV</h1>    
                <div>
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
            </header>
        </div>
    )
}

export default Title