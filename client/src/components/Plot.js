import React from 'react';
import './Plot.css';
import Plotly from 'react-plotly.js';

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

        let hour = [];
        let data = this.props.data;
        delete data['_id'];

        for(let k in data){
            this.time.push(k);
        }

        for(let v of Object.values(data)){
            hour.push(v);
        }
        for(let h of hour){
            for(let i of h){
                if( i.type === 'Hydroelectric' ||
                    i.type === 'HydroElectric' ||
                    i.type === 'HYDRO') {
                    this.hydro.push(i.value)
                }
                if( i.type === 'Interchange' ||
                    i.type === 'Interconnection' ||
                    i.type === 'INTERCHANGE') {
                    this.interchange.push(i.value)
                }
                if( i.type === 'Conventional Thermal' ||
                    i.type === 'Thermal' ||
                    i.type === 'THERMAL') {
                    this.thermal.push(i.value)
                }
                if( i.type === 'Solar' ||
                    i.type === 'SOLAR') {
                    this.solar.push(i.value)
                }
                if( i.type === 'Wind' ||
                    i.type === 'WIND') {
                    this.wind.push(i.value)
                }
                if( i.type === 'Geothermal' ||
                    i.type === 'Geothermalelectric') {
                    this.geothermal.push(i.value)
                }
                if( i.type === 'Biomass') {
                    this.biomass.push(i.value)
                }
                if( i.type === 'Internal Combustion') {
                    this.internal_combustion.push(i.value)
                }
                if( i.type === 'Turbo Gas') {
                    this.turbo_gas.push(i.value)
                }
                if( i.type === 'Nuclear Power') {
                    this.nuclear.push(i.value)
                }
                if( i.type === 'Other') {
                    this.other.push(i.value)
                }
            }
        }
    }

    render() {    
        if(!this.props.data) {
            return <div className="country-plotly">Loading...</div>;
        } else {
            this.getData();
        }
        
        return (
            <div className="country-plotly">
                <Plotly
                    data={[
                        {/*
                            type: 'line',
                            stackgroup: 'one',
                            marker: {color: 'black'},
                            name: 'interchange',
                            x: x,
                            y: interchange,
                        */},
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
                    ]}
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
                        title: 'Electricity Generation'
                    }}
                />
            </div>
        );
    }
}
        