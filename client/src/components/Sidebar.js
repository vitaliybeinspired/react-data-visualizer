import {Menu, MenuItem, ProSidebar, SidebarHeader, SubMenu} from "react-pro-sidebar";
import {VscUnmute, VscMute} from "react-icons/vsc"
import {MdDashboard} from "react-icons/md"
import React from "react";
import Plot from './Plot';
import './Sidebar.css';

export default class SideBar extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            loading: true,
            hist_toggle: false,
            forecast_toggle: false
        }
    }

    render() {
        return (
            <ProSidebar collapsed={this.props.collapsed}>
                    <Menu iconShape="circle">
                        <MenuItem onClick={this.props.toggleCollapseHandle} icon={<MdDashboard/>}>
                            Dashboard
                        </MenuItem>
                        {this.props.collapsed ? 
                            null : 
                            <div className="dashboard-container">
                                {this.props.calendar}
                                <Plot startDate={this.props.start} endDate={this.state.end} showRenewable={this.state.hist_toggle} data={this.props.hist} title={"Historical Data"}/>
                                <h3 onClick={() => {this.setState({hist_toggle: !this.state.hist_toggle})}}>Switch Graph</h3>
                                <Plot startDate={this.props.start} endDate={this.state.end} showRenewable={this.state.forecast_toggle} data={this.props.frcst} title={"Forecasted Data"}/>
                                <h3 onClick={() => {this.setState({forecast_toggle: !this.state.forecast_toggle})}}>Switch Graph</h3>
                            </div>
                        }
                        {this.props.muted ?
                            <MenuItem onClick={this.props.muteHandler} icon={<VscMute/>}>
                                Unmute Audio
                            </MenuItem>
                            :
                            <MenuItem onClick={this.props.muteHandler} icon={<VscUnmute/>}>
                                Mute Audio
                            </MenuItem>
                        }
                    </Menu>
            </ProSidebar>
        )
    }
}

