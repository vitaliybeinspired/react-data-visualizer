import {Menu, MenuItem, ProSidebar, SubMenu} from "react-pro-sidebar";
import React from "react";
import Plot from './Plot';
import './Sidebar.css';
//import Flag from "../images/nicaragua.jpg";

export default class SideBar extends React.Component {
    render() {
        return (
            <div className="pro-side-bar">
            {/*<h1><img src={Flag} alt="flag" style={{width: '10%'}} /> Nicaragua</h1> */}
            <ProSidebar collapsed={this.props.collapsed}>
                <Menu iconShape="square">
                    <SubMenu title="Select Date Range" >
                        {this.props.calendar}
                    </SubMenu>
                    <MenuItem onClick={this.props.toggleCollapseHandle}>Electrical Data</MenuItem>
                    {this.props.collapsed ? 
                        null : 
                        <>
                        <Plot data={this.props.hist}/>
                        </>
                    }
                    <MenuItem onClick={this.props.toggleCollapseHandle}>Forecast</MenuItem>
                    {this.props.collapsed ? 
                        null : 
                        <>
                        <Plot data={this.props.frcst}/>
                        </>
                    }
                </Menu>
            </ProSidebar>
        </div>
        )
    }
}

