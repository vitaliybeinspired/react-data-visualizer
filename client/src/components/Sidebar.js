import {Menu, MenuItem, ProSidebar, SidebarHeader} from "react-pro-sidebar";
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
                <SidebarHeader>
                    <div
                    style={{
                        padding: '24px',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        fontSize: 14,
                        letterSpacing: '1px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                    >
                    Electrical Energy Generation
                    </div>
                </SidebarHeader>
                <Menu iconShape="square">
                    {this.props.collapsed ? 
                        null : 
                        <div className="dashboard-container">
                            {this.props.calendar}
                            <Plot startDate={this.props.start} endDate={this.state.end} showRenewable={this.state.hist_toggle} data={this.props.hist} title={"Historical Data"}/>
                            <h3 onClick={() => {this.setState({hist_toggle: !this.state.hist_toggle})}}>Switch Graph</h3>
                        </div>
                    }
                    {this.props.collapsed ? 
                        null : 
                        <>
                        <Plot startDate={this.props.start} endDate={this.state.end} data={this.props.frcst} title={"Forecasted Data"}/>
                        </>
                    }
                </Menu>
            </ProSidebar>
        )
    }
}

