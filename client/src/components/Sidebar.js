import {Menu, MenuItem, ProSidebar, SidebarHeader} from "react-pro-sidebar";
import {VscUnmute, VscMute} from "react-icons/vsc"
import {MdDashboard} from "react-icons/md"
import {GoGraph} from "react-icons/go"
import React from "react";
import Plot from './Plot';
import ReactCountryFlag from "react-country-flag"
import './Sidebar.css';

const country_code = {
    "CostaRica" : "CR",
    "ElSalvador": "SV",
    "Mexico" : "MX",
    "Nicaragua" : "NI"
}

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
                    <MenuItem onClick={this.props.toggleCollapseHandle} icon={<ReactCountryFlag
                        className="emojiFlag"
                        countryCode={country_code[this.props.country]}
                        svg
                        style={{
                            width: '2em',
                            height: '2em',
                            borderRadius: "1em"
                        }}
                    />}>
                        {this.props.country}
                    </MenuItem>
                    {this.props.collapsed ? 
                        null : 
                        <div className="dashboard-container">
                            {this.props.calendar}
                            <Plot startDate={this.props.start} endDate={this.state.end} showRenewable={this.state.hist_toggle} data={this.props.hist} title={"Historical Data"}/>
                            <div onClick={() => {this.setState({hist_toggle: !this.state.hist_toggle})}} class="graph-change-button">
                                <p class="tooltiptext">change chart labels</p>
                                <GoGraph/>
                            </div>
                            <Plot startDate={this.props.start} endDate={this.state.end} showRenewable={this.state.forecast_toggle} data={this.props.frcst} title={"Forecasted Data"}/>
                            <div onClick={() => {this.setState({forecast_toggle: !this.state.forecast_toggle})}} class="graph-change-button">
                                <p class="tooltiptext">change chart labels</p>
                                <GoGraph/>
                            </div>
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

