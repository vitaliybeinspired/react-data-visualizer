import React from 'react';
import {str_to_date} from './DateToWeek';
import './Plot.css';
import {GoGraph} from "react-icons/go"
import {FaFileDownload} from 'react-icons/fa'
import Plotly from 'react-plotly.js';
import {CSVLink} from "react-csv";

export default class Plot extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            plot: null,
            start: this.props.startDate,
            loading: this.props.loading,
            end: this.props.endDate,
            pie_data: null,
            pie_layout: null,
            pie_point_index: null,
            toggle: false,
            relayout: null,
            country: null,
        }
        this.hoverDataHandler = this.hoverDataHandler.bind(this);
        this.toggleHandler = this.toggleHandler.bind(this);
        this.mergeDictionaries = this.mergeDictionaries.bind(this);
        this.updateGraph = this.updateGraph.bind(this);
    }

    getData() {
        this.time = [];
        this.hydro = [];
        this.wind = [];
        this.solar = [];
        this.thermal = [];
        this.other = [];
        this.interchange = [];
        this.biomass = [];
        this.geothermal = [];
        this.internal_combustion = [];
        this.turbo_gas = [];
        this.nuclear = [];

        this.renewable = [];
        this.not_renewable = [];

        let hour = [];
        let data = this.props.data;

        let start = this.state.start;
        let end = this.state.end;

        delete data['_id'];

        let keys = Object.getOwnPropertyNames(data);
        keys.sort(function(a, b){
            return str_to_date(a) - str_to_date(b);
        });

        for(let k of keys){
            let dateVal = str_to_date(k);
            if (dateVal < start || dateVal > end){
                continue;
            }
            hour.push(data[k]);
            this.time.push(k)
        }
        console.log()
        if (hour.length < 1){
            if(this.state.plot !== undefined){
                this.setState({plot: undefined})
                return
            }
        }

        for(let h of hour){
            let hydro_energy = 0;
            let wind_energy = 0;
            let solar_energy = 0;
            let thermal_energy = 0;
            let other_energy = 0;
            let interchange_energy = 0;
            let biomass_energy = 0;
            let geothermal_energy = 0;
            let internal_combustion_energy = 0;
            let turbo_gas_energy = 0;
            let nuclear_energy = 0;

            for(let i of h){
                if( i.type === 'Hydroelectric' ||
                    i.type === 'HydroElectric' ||
                    i.type === 'HYDRO') {
                    hydro_energy = i.value
                }
                if( i.type === 'Interchange' ||
                    i.type === 'Interconnection' ||
                    i.type === 'INTERCHANGE') {
                    interchange_energy = i.value
                }
                if( i.type === 'Conventional Thermal' ||
                    i.type === 'Thermal' ||
                    i.type === 'THERMAL') {
                    thermal_energy = i.value
                }
                if( i.type === 'Solar' ||
                    i.type === 'SOLAR') {
                    solar_energy = i.value
                }
                if( i.type === 'Wind' ||
                    i.type === 'WIND') {
                    wind_energy = i.value
                }
                if( i.type === 'Geothermal' ||
                    i.type === 'Geothermalelectric') {
                    geothermal_energy = i.value
                }
                if( i.type === 'Biomass') {
                    biomass_energy = i.value
                }
                if( i.type === 'Internal Combustion') {
                    internal_combustion_energy = i.value
                }
                if( i.type === 'Turbo Gas') {
                    turbo_gas_energy = i.value
                }
                if( i.type === 'Nuclear Power') {
                    nuclear_energy = i.value
                }
                if( i.type === 'Other') {
                    other_energy = i.value
                }
            }

            this.hydro.push(hydro_energy);
            this.wind.push(wind_energy);
            this.solar.push(solar_energy);
            this.thermal.push(thermal_energy);
            this.other.push(other_energy);
            this.interchange.push(interchange_energy);
            this.biomass.push(biomass_energy);
            this.geothermal.push(geothermal_energy);
            this.internal_combustion.push(internal_combustion_energy);
            this.turbo_gas.push(turbo_gas_energy);
            this.nuclear.push(nuclear_energy);
            
            this.renewable.push(
                hydro_energy + 
                wind_energy + 
                solar_energy + 
                biomass_energy + 
                geothermal_energy +
                turbo_gas_energy
            )

            this.not_renewable.push(
                thermal_energy +
                other_energy +
                internal_combustion_energy +
                nuclear_energy
            )
        }

        // FORMAT CSV DATA
        this.csvData = [[
            "time",
            "HydoElectric",
            "Wind",
            "Solar",
            "Thermal",
            "Biomass",
            "Geothermal",
            "Internal Combustion",
            "Gas Turbine",
            "Nuclear",
            "Interchange",
            "Unidentified"
        ]];

        let i = -1;
        while (this.time[++i]) { 
            this.csvData.push( [
                this.time[i],
                this.hydro[i],
                this.wind[i],
                this.solar[i],
                this.thermal[i],
                this.biomass[i],
                this.geothermal[i],
                this.internal_combustion[i],
                this.turbo_gas[i],
                this.nuclear[i],
                this.interchange[i],
                this.other[i]
            ] );
        }
        
        // replace empty sets with empty array
        // this way they arent graphed
        if(!this.hydro.some((el)=>{return el !== 0})){
            this.hydro = [];
        }
        if(!this.wind.some((el)=>{return el !== 0})){
            this.wind = [];
        }
        if(!this.solar.some((el)=>{return el !== 0})){
            this.solar = [];
        }
        if(!this.thermal.some((el)=>{return el !== 0})){
            this.thermal = [];
        }
        if(!this.other.some((el)=>{return el !== 0})){
            this.other = [];
        }
        if(!this.interchange.some((el)=>{return el !== 0})){
            this.interchange = [];
        }
        if(!this.biomass.some((el)=>{return el !== 0})){
            this.biomass = [];
        }
        if(!this.geothermal.some((el)=>{return el !== 0})){
            this.geothermal = [];
        }
        if(!this.internal_combustion.some((el)=>{return el !== 0})){
            this.internal_combustion = [];
        }
        if(!this.turbo_gas.some((el)=>{return el !== 0})){
            this.turbo_gas = [];
        }
        if(!this.nuclear.some((el)=>{return el !== 0})){
            this.nuclear = [];
        }
    }

    toggleHandler(){
        this.updateGraph(true);
        this.setNewPieChart(true);
    }

    updateGraph(fromToggle=false){
        if(this.props.data) {
            this.getData();
            this.setState({
                country: this.props.country
            })
        }
        let current_data = [
            {
                type: 'line',
                stackgroup: 'one',
                marker: {color: 'maroon'},
                name: 'Combustion',
                x: this.time,
                y: this.internal_combustion
            },
            {
                type: 'line',
                stackgroup: 'one',
                marker: {color: 'fuchsia'},
                name: 'Gas Turbo',
                x: this.time,
                y: this.turbo_gas
            },
            {
                type: 'line',
                stackgroup: 'one',
                marker: {color: 'olive'},
                name: 'Nuclear',
                x: this.time,
                y: this.nuclear
            },
            {
                type: 'line',
                stackgroup: 'one',
                marker: {color: 'silver'},
                name: 'Other',
                x: this.time,
                y: this.other
            },
            {

                type: 'line',
                stackgroup: 'one',
                marker: {color: 'yellow'},
                name: 'Solar',
                x: this.time,
                y: this.solar
            },
            {
                type: 'line',
                stackgroup: 'one',
                marker: {color: 'orange'},
                name: 'Geothermal',
                x: this.time,
                y: this.geothermal
            },
            {
                type: 'line',
                stackgroup: 'one',
                marker: {color: 'lime'},
                name: 'Biomass',
                x: this.time,
                y: this.biomass
            },
            {
                type: 'line',
                stackgroup: 'one',
                marker: {color: 'cyan'},
                name: 'Wind',
                x: this.time,
                y: this.wind
            },
            {
                type: 'line',
                stackgroup: 'one',
                marker: {color: 'red'},
                name: 'Thermal',
                x: this.time,
                y: this.thermal
            },
            {

                type: 'line',
                stackgroup: 'one',
                marker: {color: 'blue'},
                name: 'Hydroelectric',
                x: this.time,
                y: this.hydro
            }
        ]

        if((fromToggle && !this.state.toggle) || (this.state.toggle && !fromToggle)){
            current_data = [
                {
                    type: 'line',
                    stackgroup: 'one',
                    marker: {color: 'green'},
                    name: 'Renewable',
                    x: this.time,
                    y: this.renewable
                },
                {
                    type: 'line',
                    stackgroup: 'one',
                    marker: {color: 'red'},
                    name: 'Non-renewable',
                    x: this.time,
                    y: this.not_renewable
                },
            ]
        }
        let layout = 
            {
                width: 600, 
                height: 400,
                yaxis:{
                    title: "MWh",
                    // showticklabels: false,
                    gridcolor: "#FFFFFF55"
                },
                xaxis:{
                    title: "Time",
                    showticklabels: false,
                    gridcolor: "#FFFFFF55"
                },
                plot_bgcolor:"#FFFFFF99",
                paper_bgcolor:"#00000000",
                font: 
                    {
                        color: "#FFFFFF",
                    },
                title: this.props.title
            }
        if(this.state.relayout){
            layout = this.mergeDictionaries(layout, this.state.relayout);
        }

        let graph = <Plotly
            onHover={this.hoverDataHandler}
            onRelayout={(e) => {this.setState({relayout: e})}}
            data={current_data}
            layout={layout}
        />
        this.setState({plot: graph});
        this.setNewPieChart();
    }

    setNewPieChart(fromToggle=false){
        let values = [];
        let labels = [];
        let colors = [];

        let types = [
            {label: 'Combustion', color: 'maroon', data: this.internal_combustion},
            {label: 'Gas Turbo', color: 'fuchsia', data: this.turbo_gas},
            {label: 'Nuclear', color: 'olive', data: this.nuclear},
            {label: 'Other', color: 'silver', data: this.other},
            {label: 'Solar', color: 'yellow', data: this.solar},
            {label: 'Geothermal', color: 'orange', data: this.geothermal},
            {label: 'Biomass', color: 'lime', data: this.biomass},
            {label: 'Wind', color: 'cyan', data: this.wind},
            {label: 'Thermal', color: 'red', data: this.thermal},
            {label: 'Hydroelectric', color: 'blue', data: this.hydro}
        ]

        let alt_types = [
            {label: 'Renewable', color: 'green', data: this.renewable},
            {label: 'Non-renewable', color: 'red', data: this.not_renewable}
        ]

        let pie_types = types;
        if((fromToggle && !this.state.toggle) || (this.state.toggle && !fromToggle))
            pie_types = alt_types;

        pie_types.forEach(pie_type => {
            if(pie_type.data.length >= 0){
                labels.unshift(pie_type.label)
                colors.unshift(pie_type.color)
                values.unshift(pie_type.data[this.state.pie_point_index])
            }
        });

        this.setState({
            pie_data: [{
                values: values,
                labels: labels,
                marker: {
                    colors: colors,
                },
                type: 'pie',
                // set this to true if you want random colors
                sort: false,
            }],
            pie_layout: {
                width: 600, 
                height: 400,
                plot_bgcolor:"#FFFFFF99",
                paper_bgcolor:"#00000000",
                font: 
                    {
                        color: "#FFFFFF",
                    },
                title: this.time[this.state.pie_point_index]
            },
        })
        if(fromToggle){
            this.setState({
                toggle: !this.state.toggle,
            })
        }

    }

    hoverDataHandler(dataEvent){
        if(dataEvent.points.length){
            let index = dataEvent.points[0].pointIndex;
            
            this.setState({pie_point_index: index})
            this.setNewPieChart();
        }
    }

    mergeDictionaries(obj1, obj2){
        for (var key in obj2){
            if(obj2.hasOwnProperty(key)){
                if(key.includes(".")){
                    let parts = key.split(".")
                    if(key.includes(".range")){
                        if(obj1[parts[0]].hasOwnProperty('range')){
                            let which_end = parseInt(key.charAt(key.length - 2));
                            obj1[parts[0]]['range'][which_end] = obj2[key];
                        }else{
                            let new_range = [0, 0]
                            let which_end = parseInt(key.charAt(key.length - 2));
                            new_range[which_end] = obj2[key];
                            obj1[parts[0]]['range'] = new_range;
                        }
                    }else{
                        obj1[parts[0]][parts[1]] = obj2[key];
                    }
                }else{
                    obj1[key] = obj2[key];
                }
            }
        }
        return obj1;
    }

    componentDidMount(){
        this.setState({
            country: this.props.country
        });
    }

    render() {
        if(!this.props.data) {
            return <div/>;
        } else {
            this.getData();
            if(this.time.length === 0) {
                return <div/>;
            }
        }
        if(this.state.plot === null){
            this.updateGraph();
        }
        if(this.state.country !== this.props.country){
            // comment out this setstate if we want persistance between countries
            this.setState({
                relayout: null,
                plot: null
            })
            this.updateGraph(false);
        }
        if(this.state.start !== this.props.startDate){
            this.setState({
                start: this.props.startDate,
                end: this.props.endDate,
                plot: null,
            })
            this.updateGraph()
        }
        if(this.state.end !== this.props.endDate){
            this.setState({
                start: this.props.startDate,
                end: this.props.endDate,
                plot: null,
            })
            this.updateGraph()
        }

        if(this.state.loading !== this.props.loading){
            this.setState({
                start: this.props.startDate,
                end: this.props.endDate,
                loading: this.props.loading,
                plot: null,
            })
            this.updateGraph()
        }

        if(this.props.updating){
            this.getData();
            this.updateGraph();
            this.props.updateCallback()
        }
        
        if(this.state.plot === undefined && !(this.props.loading || this.state.loading)){
            return <div className="country-plotly">No {this.props.title} for selected date range.</div>;
        }

        var buttons = null
        if(this.csvData !== undefined && this.csvData !== null){
            buttons = <div className="plot-options">
                <div onClick={this.toggleHandler} className="graph-change-button">
                    <p className="tooltiptext">change chart labels</p>
                    <GoGraph/>
                </div>
                <CSVLink data={this.csvData}>
                    <div className="download-link-container">
                        <p className="tooltiptext">download me as CSV</p>
                        <FaFileDownload/>
                    </div>
                </CSVLink>
            </div>
        }
        return (
            <div className="country-plotly">
                {this.props.loading || this.props.updating ? <>loading...</> : null}
                {this.state.plot}
                {
                    this.state.pie_data ? 
                    <div className="pie-chart">
                        <Plotly 
                            data={this.state.pie_data}
                            layout={this.state.pie_layout}
                        />
                    </div>
                    :
                    null
                }
                {buttons}
            </div>
        );
    }
}
        