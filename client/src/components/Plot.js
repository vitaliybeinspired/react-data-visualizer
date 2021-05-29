import React from 'react';
import {str_to_date} from './DateToWeek';
import './Plot.css';
import {FaFileDownload} from 'react-icons/fa'
import Plotly from 'react-plotly.js';
import {CSVLink} from "react-csv";

export default class Plot extends React.Component{
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

        let start = this.props.startDate;
        let end = this.props.endDate;

        delete data['_id'];

        let keys = Object.getOwnPropertyNames(data);
        keys.sort(function(a, b){
            return str_to_date(a) - str_to_date(b);
        });

        for(let i = 0; i < keys.length; ++i){
            let dateVal = str_to_date(keys[i]);
            if (dateVal < start || dateVal > end){
                continue;
            }
            this.time.push(keys[i]);
        }

        for(let k of keys){
            let dateVal = str_to_date(k);
            if (dateVal < start || dateVal > end){
                continue;
            }
            hour.push(data[k]);
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

    render() {    
        if(!this.props.data) {
            return <div className="country-plotly">Loading...</div>;
        } else {
            this.getData();
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

        if(this.props.showRenewable === true){
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
        
        return (
            <div className="country-plotly">
                <Plotly
                    data={current_data}
                    layout={{
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
                    }}
                />
                <div className="plot-options">
                    {this.props.toggle}
                    <div className="download-link-container">
                        <p className="tooltiptext">Download me as a CSV</p>
                        <FaFileDownload/>
                        {/* <CSVLink data={this.csvData}/> */}
                    </div>
                </div>
            </div>
        );
    }
}
        