import {Menu, MenuItem, ProSidebar} from "react-pro-sidebar";
import {VscUnmute, VscMute} from "react-icons/vsc"
import {MdDashboard} from 'react-icons/md'
import React from "react";
import Plot from './Plot';
import Accuracy from './Accuracy'
import ReactCountryFlag from "react-country-flag"
import './Sidebar.css';

const country_code = {
    "Costa Rica" : "CR",
    "El Salvador": "SV",
    "Mexico" : "MX",
    "Nicaragua" : "NI"
}

export default class SideBar extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            loading: true,
        }
    }

    render() {
        return (
            <ProSidebar collapsed={this.props.collapsed}>
                <Menu iconShape="circle">
                    <MenuItem 
                        onClick={this.props.toggleCollapseHandle} 
                        icon={
                            this.props.country === "none" ? 
                            <MdDashboard/> 
                            : 
                            <ReactCountryFlag
                                className="emojiFlag"
                                countryCode={country_code[this.props.country]}
                                svg
                                style={{
                                    width: '2em',
                                    height: '2em',
                                    borderRadius: "1em"
                            }}/>
                        }
                    >
                    {
                        this.props.country === "none" ? 
                        "Click on a country!" 
                        : 
                        this.props.country
                    }
                    </MenuItem>
                    {this.props.collapsed || this.props.country === "none" ? 
                        null : 
                        <div className="dashboard-container">
                            {this.props.calendar}
                            <Plot country={this.props.country} startDate={this.props.start} endDate={this.state.end} data={this.props.hist} title={"Historical Data"}/>
                            <Plot country={this.props.country} startDate={this.props.start} endDate={this.state.end} data={this.props.frcst} title={"Forecasted Data"}/>
                            <Accuracy startDate={this.props.start} endDate={this.state.end} hist={this.props.hist} frcst={this.props.frcst}/>
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

