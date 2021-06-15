import {Menu, MenuItem, ProSidebar} from "react-pro-sidebar";
import {VscUnmute, VscMute} from "react-icons/vsc"
import {MdDashboard} from 'react-icons/md'
import React from "react";
import DateTimePicker from '../components/DateTimePicker'
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
            updating: false,
        }
        this.changeEndDate = this.changeEndDate.bind(this)
        this.changeStartDate = this.changeStartDate.bind(this)
        this.updateLoading = this.updateLoading.bind(this)
        this.updateCompleted = this.updateCompleted.bind(this)
    }

    changeStartDate(date){
        this.props.changeStartDate(date, this.updateLoading)
    }

    changeEndDate(date){
        this.props.changeEndDate(date, this.updateLoading);
    }

    updateLoading(){
        this.setState({updating: true})
    }

    updateCompleted(){
        this.setState({updating: false})
    }

    render() {

        if(this.state.loading !== this.props.loading){
            this.setState({loading: this.props.loading})
        }

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
                        style={{textTransform: "uppercase",fontSize: "60px", fontWeight: 900}}
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
                            {DateTimePicker(this.props.start, this.props.end, this.changeStartDate, this.changeEndDate)}
                            <Plot 
                                loading={this.state.loading}
                                country={this.props.country}
                                startDate={this.props.start}
                                endDate={this.props.end}
                                data={this.props.hist}
                                title={"Historical Data"}
                                updating={this.state.updating}
                                updateCallback={this.updateCompleted}
                            />
                            <Plot 
                                loading={this.state.loading}
                                country={this.props.country}
                                startDate={this.props.start}
                                endDate={this.props.end}
                                data={this.props.frcst}
                                title={"Forecasted Data"}
                                updating={this.state.updating}
                                updateCallback={this.updateCompleted}
                            />
                            <Accuracy loading={this.props.loading} startDate={this.props.start} endDate={this.props.end} hist={this.props.hist} frcst={this.props.frcst}/>
                        </div>
                    }
                    {this.props.muted ?
                        <MenuItem onClick={this.props.muteHandler} icon={<VscMute/>}>
                            unmute
                        </MenuItem>
                        :
                        <MenuItem onClick={this.props.muteHandler} icon={<VscUnmute/>}>
                            mute
                        </MenuItem>
                    }
                    </Menu>
            </ProSidebar>
        )
    }
}

