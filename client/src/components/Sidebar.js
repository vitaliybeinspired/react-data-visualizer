import {ProSidebar} from "react-pro-sidebar";
import React from "react";
import Plot from './Plot';
import './Sidebar.css';
//import Flag from "../images/nicaragua.jpg";

export default class SideBar extends React.Component {
    render() {
        return (
            <div className="pro-side-bar">
                {/*<h1><img src={Flag} alt="flag" style={{width: '10%'}} /> Nicaragua</h1> */}
                <ProSidebar>
                    <Plot data={this.props.data}/>
                </ProSidebar>
            </div>
        )
    }
}

