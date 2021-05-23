import React from 'react';
import Plot from 'react-plotly.js';
import { GreaterStencilFunc } from 'three';
import {str_to_date} from './DateToWeek';

export default class Mexico extends React.Component {
    render() {

        let x = [];
        let y = [];
        let hydro = [];
        let wind = [];
        let thermal = [];
        let internal_combustion = [];
        let nuclear_power = [];
        let biomass = [];
        let turbo_gas = [];
        let geothermalelectric = [];
        let xForecast = [];
        let yForecast = [];
        let hydroForecast = [];
        let windForecast = [];
        let thermalForecast = [];
        let internal_combustionForecast = [];
        let nuclear_powerForecast = [];
        let biomassForecast = [];
        let turbo_gasForecast = [];
        let geothermalelectricForecast = [];
        let renewable = [];
        let non_renewable = [];
        let renewable_forecast = [];
        let non_renewable_forecast = [];
        let green_energy = [];
        let non_green = [];
        let green_energy_forecast = [];
        let non_green_forecast = [];

        var historicData = this.props.dataFromParent['Historic'];
        var forecastData = this.props.dataFromParent['Forecast'];
        var start = this.props.startDate;
        var end = this.props.endDate;
 
         if(historicData){
             var keys = Object.getOwnPropertyNames(historicData);
             keys.sort(function(a, b){
                 return str_to_date(a) - str_to_date(b);
             });
 
             for(let i = 0; i < keys.length; ++i){
                 let dateVal = str_to_date(keys[i]);
                 if (dateVal < start || dateVal > end){
                     continue;
                 }
                 x.push(keys[i]);
             }
 
             for(let k of keys){
                 let dateVal = str_to_date(k);
                 if (dateVal < start || dateVal > end){
                     continue;
                 }
                 y.push(historicData[k]);
             }

            for(let k of y){
                for(let i of k){
                    var rn = 0;
                    var nrn = 0;
                    var g = 0;
                    var ng = 0;
                    if(i.type === 'HydroElectric'){
                        hydro.push(i.value);
                        rn += i.value;
                        g += i.value;
                    }
                    if(i.type === 'Internal Combustion'){
                        internal_combustion.push(i.value);
                        nrn += i.value;
                        ng += i.value;
                    }
                    if(i.type === 'Conventional Thermal'){
                        thermal.push(i.value);
                        nrn += i.value;
                        ng += i.value;
                    }
                    if(i.type === 'Wind'){
                        wind.push(i.value);
                        renewable += i.value;
                        g += i.value;
                    }
                    if(i.type === 'Biomass'){
                        biomass.push(i.value);
                        rn += i.value;
                        ng += i.value;
                    }
                    if(i.type === 'Nuclear Power'){
                        nuclear_power.push(i.value);
                        ng += i.value;
                        rn += i.value;
                    }
                    if(i.type === 'Turbo Gas'){
                        turbo_gas.push(i.value);
                        nrn += i.value;
                        ng += i.value;
                    }
                    if(i.type === 'Geothermalelectric'){
                        geothermalelectric.push(i.value);
                        rn += i.value;
                        g += i.value;
                    }
                    renewable.push(rn);
                    non_renewable.push(nrn);
                    green_energy.push(g);
                    non_green.push(ng);
                }
            }

            if(forecastData){
                var Forecastkeys = Object.getOwnPropertyNames(forecastData);
                Forecastkeys.sort(function(a, b){
                    return str_to_date(a) - str_to_date(b);
                });
    
                for(let i = 0; i < Forecastkeys.length; ++i){
                    let dateVal = str_to_date(keys[i]);
                    if (dateVal < start || dateVal > end){
                        continue;
                    }
                    xForecast.push(Forecastkeys[i]);
                }
    
                for(let k of Forecastkeys){
                    let dateVal = str_to_date(k);
                    if (dateVal < start || dateVal > end){
                        continue;
                    }
                    yForecast.push(forecastData[k]);
                }
   
               for(let k of yForecast){
                   for(let i of k){
                        var rn = 0;
                        var nrn = 0;
                        var g = 0;
                        var ng = 0;
                       if(i.type === 'HydroElectric'){
                           hydroForecast.push(i.value);
                           rn += i.value;
                           g += i.value;
                       }
                       if(i.type === 'Internal Combustion'){
                           internal_combustionForecast.push(i.value);
                           nrn += i.value;
                           ng += i.value;
                       }
                       if(i.type === 'Conventional Thermal'){
                           thermalForecast.push(i.value);
                           renewable += i.value;
                           g += i.value;
                       }
                       if(i.type === 'Wind'){
                           windForecast.push(i.value);
                           renewable += i.value;
                           g += i.value;
                       }
                       if(i.type === 'Biomass'){
                           biomassForecast.push(i.value);
                           rn += i.value;
                           ng += i.value;
                       }
                       if(i.type === 'Nuclear Power'){
                           nuclear_powerForecast.push(i.value);
                           ng += i.value;
                           rn += i.value;
                       }
                       if(i.type === 'Turbo Gas'){
                           turbo_gasForecast.push(i.value);
                           nrn += i.value;
                           ng += i.value;
                       }
                       if(i.type === 'Geothermalelectric'){
                           geothermalelectricForecast.push(i.value);
                           rn += i.value;
                           g += i.value;
                       }
                       renewable_forecast.push(rn);
                       non_renewable_forecast.push(nrn);
                       green_energy_forecast.push(g);
                       non_green_forecast.push(ng);
                   }
               }
            }
        }
        else{
            return <div className="country-plotly">Loading...</div>;
        }

        //Plot just forecasted data
        if(hydro.length === 0 && hydroForecast.length !== 0){
            return (
                <div className="country-plotly">
                    <Plot
                        data={[
                            {

                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'blue'},
                                name: 'hydro',
                                x: xForecast,
                                y: hydroForecast,
                            },
                            {
                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'black'},
                                name: 'internal combustion',
                                x: xForecast,
                                y: internal_combustionForecast,
                            },
                            {

                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'red'},
                                name: 'thermal',
                                x: xForecast,
                                y: thermalForecast
                            },
                            {
                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'cyan'},
                                name: 'wind',
                                x: xForecast,
                                y: windForecast
                            },
                            {
                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'orange'},
                                name: 'biomass',
                                x: xForecast,
                                y: biomassForecast
                            },
                            {
                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'yellow'},
                                name: 'nuclear power',
                                x: xForecast,
                                y: nuclear_powerForecast
                            },
                            {
                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'pink'},
                                name: 'turbo gas',
                                x: xForecast,
                                y: turbo_gasForecast
                            },
                            {
                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'green'},
                                name: 'geothermal electric',
                                x: xForecast,
                                y: geothermalelectricForecast
                            },

                        ]}
                        layout={{
                            width: 800, 
                            height: 500,
                            yaxis:{
                                title: "MWh",
                                // showticklabels: false,
                                gridcolor: "#FFFFFF55"
                            },
                            xaxis:{
                                title: "Time (HH-dd/mm/yyyy)",
                                showticklabels: false,
                                gridcolor: "#FFFFFF55"
                            },
                            plot_bgcolor:"#FFFFFF99",
                            paper_bgcolor:"#00000000",
                            font: 
                                {
                                    color: "#FFFFFF",
                                },
                            title: 'Forecast'
                        }}
                    />
            </div>
            );
        }

        //Plot just historic data 
        if(hydroForecast.length === 0 & hydro.length !== 0){
            return (                
                <div className="country-plotly">
                    <Plot
                        data={[
                            {

                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'blue'},
                                name: 'hydro',
                                x: x,
                                y: hydro,
                            },
                            {
                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'black'},
                                name: 'internal combustion',
                                x: x,
                                y: internal_combustion,
                            },
                            {

                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'red'},
                                name: 'thermal',
                                x: x,
                                y: thermal
                            },
                            {
                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'cyan'},
                                name: 'wind',
                                x: x,
                                y: wind
                            },
                            {
                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'orange'},
                                name: 'biomass',
                                x: x,
                                y: biomass
                            },
                            {
                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'yellow'},
                                name: 'nuclear power',
                                x: x,
                                y: nuclear_power
                            },
                            {
                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'pink'},
                                name: 'turbo gas',
                                x: x,
                                y: turbo_gas
                            },
                            {
                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'green'},
                                name: 'geothermal electric',
                                x: x,
                                y: geothermalelectric
                            },

                        ]}
                        layout={{
                            width: 800, 
                            height: 500,
                            yaxis:{
                                title: "MWh",
                                // showticklabels: false,
                                gridcolor: "#FFFFFF55"
                            },
                            xaxis:{
                                title: "Time (HH-dd/mm/yyyy)",
                                showticklabels: false,
                                gridcolor: "#FFFFFF55"
                            },
                            plot_bgcolor:"#FFFFFF99",
                            paper_bgcolor:"#00000000",
                            font: 
                                {
                                    color: "#FFFFFF",
                                },
                            title: 'Historic'
                        }}
                    />
            </div>);
        }else{
                
            return (
                <div className="country-plotly">
                    <Plot
                        data={[
                            {

                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'blue'},
                                name: 'hydro',
                                x: x,
                                y: hydro,
                            },
                            {
                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'black'},
                                name: 'internal combustion',
                                x: x,
                                y: internal_combustion,
                            },
                            {

                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'red'},
                                name: 'thermal',
                                x: x,
                                y: thermal
                            },
                            {
                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'cyan'},
                                name: 'wind',
                                x: x,
                                y: wind
                            },
                            {
                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'orange'},
                                name: 'biomass',
                                x: x,
                                y: biomass
                            },
                            {
                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'yellow'},
                                name: 'nuclear power',
                                x: x,
                                y: nuclear_power
                            },
                            {
                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'pink'},
                                name: 'turbo gas',
                                x: x,
                                y: turbo_gas
                            },
                            {
                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'green'},
                                name: 'geothermal electric',
                                x: x,
                                y: geothermalelectric
                            },

                        ]}
                        layout={{
                            width: 500, 
                            height: 275,
                            yaxis:{
                                title: "MWh",
                                // showticklabels: false,
                                gridcolor: "#FFFFFF55"
                            },
                            xaxis:{
                                title: "Time (HH-dd/mm/yyyy)",
                                showticklabels: false,
                                gridcolor: "#FFFFFF55"
                            },
                            plot_bgcolor:"#FFFFFF99",
                            paper_bgcolor:"#00000000",
                            font: 
                                {
                                    color: "#FFFFFF",
                                },
                            title: 'Historic'
                        }}
                    />
                     <Plot
                        data={[
                            {

                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'blue'},
                                name: 'hydro',
                                x: xForecast,
                                y: hydroForecast,
                            },
                            {
                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'black'},
                                name: 'internal combustion',
                                x: xForecast,
                                y: internal_combustionForecast,
                            },
                            {

                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'red'},
                                name: 'thermal',
                                x: xForecast,
                                y: thermalForecast
                            },
                            {
                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'cyan'},
                                name: 'wind',
                                x: xForecast,
                                y: windForecast
                            },
                            {
                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'orange'},
                                name: 'biomass',
                                x: xForecast,
                                y: biomassForecast
                            },
                            {
                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'yellow'},
                                name: 'nuclear power',
                                x: xForecast,
                                y: nuclear_powerForecast
                            },
                            {
                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'pink'},
                                name: 'turbo gas',
                                x: xForecast,
                                y: turbo_gasForecast
                            },
                            {
                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'green'},
                                name: 'geothermal electric',
                                x: xForecast,
                                y: geothermalelectricForecast
                            },

                        ]}
                        layout={{
                            width: 500, 
                            height: 275,
                            yaxis:{
                                title: "MWh",
                                // showticklabels: false,
                                gridcolor: "#FFFFFF55"
                            },
                            xaxis:{
                                title: "Time (HH-dd/mm/yyyy)",
                                showticklabels: false,
                                gridcolor: "#FFFFFF55"
                            },
                            plot_bgcolor:"#FFFFFF99",
                            paper_bgcolor:"#00000000",
                            font: 
                                {
                                    color: "#FFFFFF",
                                },
                            title: 'Forecast'
                        }}
                    />
                </div>
            );
        }
    }
}