import {Menu, MenuItem, ProSidebar, SubMenu} from "react-pro-sidebar";
import React from "react";
import './ProSidebar.css';

export default class ProSideBar extends React.Component {
    render() {
        return (
            <div className="pro-side-bar">
                <ProSidebar collapsed={this.props.collapsed}>
                    <Menu iconShape="square">
                        <MenuItem onClick={this.props.toggleCollapseHandle}>Dashboard</MenuItem>
                        {this.props.collapsed ? null : this.props.graphFromParent}
                        <SubMenu title="Components" >
                            <MenuItem>Component 1</MenuItem>
                            <MenuItem>Component 2</MenuItem>
                        </SubMenu>
                    </Menu>
                </ProSidebar>
            </div>
        )
    }
}

