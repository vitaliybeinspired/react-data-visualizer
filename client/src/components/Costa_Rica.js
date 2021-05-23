import {str_to_date} from './DateToWeek';
import React from 'react';
import Plot from 'react-plotly.js';

export default class Costa_Rica extends React.Component {

    render() {

        let x = [];
        let y = [];
        let hydro = [];
        let wind = [];
        let solar = [];
        let thermal = [];
        let other = [];
        let interchange = [];
        let xForecast = [];
        let yForecast = [];
        let hydroForecast = [];
        let windForecast = [];
        let solarForecast = [];
        let thermalForecast = [];
        let otherForecast = [];
        let interchangeForecast = [];

       var historic_data = this.props.dataFromParent['Historic'];
       var forecast_data = this.props.dataFromParent['Forecast'];
       var start = this.props.startDate;
       var end = this.props.endDate;
       var renewable = 0;
       var non_renewable = 0;
       var green = 0;
       var non_green = 0;

        if(historic_data){
            var keys = Object.getOwnPropertyNames(historic_data);
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
                y.push(historic_data[k]);
            }

            for(let k of y){
                for(let i of k){
                    if(i.type === 'Hydroelectric'){
                        hydro.push(i.value)
                    }
                    if(i.type === 'Interchange'){
                        interchange.push(i.value)
                    }
                    if(i.type === 'Other'){
                        other.push(i.value)
                    }
                    if(i.type === 'Solar'){
                        solar.push(i.value)
                    }
                    if(i.type === 'Thermal'){
                        thermal.push(i.value)
                    }
                    if(i.type === 'Wind'){
                        wind.push(i.value)
                    }
                }
            }
        }
        if(forecast_data){
            var Forecastkeys = Object.getOwnPropertyNames(forecast_data);
            Forecastkeys.sort(function(a, b){
                return str_to_date(a) - str_to_date(b);
            });

            for(let i = 0; i < Forecastkeys.length; ++i){
                let dateVal = str_to_date(Forecastkeys[i]);
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
                yForecast.push(forecast_data[k]);
            }

            for(let k of y){
                for(let i of k){
                    if(i.type === 'Hydroelectric'){
                        hydroForecast.push(i.value)
                    }
                    if(i.type === 'Interchange'){
                        interchangeForecast.push(i.value)
                    }
                    if(i.type === 'Other'){
                        otherForecast.push(i.value)
                    }
                    if(i.type === 'Solar'){
                        solarForecast.push(i.value)
                    }
                    if(i.type === 'Thermal'){
                        thermalForecast.push(i.value)
                    }
                    if(i.type === 'Wind'){
                        windForecast.push(i.value)
                    }
                }
            }
        }
        else{
            return <div className="country-plotly">Loading...</div>;
        }

        //display historic data only
        if(hydro.length !== 0 && hydroForecast.length === 0){
            return (
                <div className="country-plotly">
                    <Plot
                        data={[
                            {
                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'orange'},
                                name: 'other',
                                x: x,
                                y: other
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
                                marker: {color: 'yellow'},
                                name: 'solar',
                                x: x,
                                y: solar,
                            },
                            {
                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'black'},
                                name: 'interchange',
                                x: x,
                                y: interchange,
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
                                marker: {color: 'blue'},
                                name: 'hydro',
                                x: x,
                                y: hydro,
                            },

                        ]}
                        layout={ 
                            {
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
                            }
                        }
                    />
                </div>
            );
        }
        //display forecast data only 
        if(hydro.length === 0 && hydroForecast.length !== 0){
            return (
                <div className="country-plotly">
                    <Plot
                        data={[
                            {
                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'orange'},
                                name: 'other',
                                x: xForecast,
                                y: otherForecast
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
                                marker: {color: 'yellow'},
                                name: 'solar',
                                x: xForecast,
                                y: solarForecast,
                            },
                            {
                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'black'},
                                name: 'interchange',
                                x: xForecast,
                                y: interchangeForecast,
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
                                marker: {color: 'blue'},
                                name: 'hydro',
                                x: xForecast,
                                y: hydroForecast,
                            },

                        ]}
                        layout={ 
                            {
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
                            }
                        }
                    />
                </div>
            );
        }
        //display both historic and forecast data
        else{
            return (
                <div className="country-plotly">
                    <Plot
                        data={[
                            {
                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'orange'},
                                name: 'other',
                                x: x,
                                y: other
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
                                marker: {color: 'yellow'},
                                name: 'solar',
                                x: x,
                                y: solar,
                            },
                            {
                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'black'},
                                name: 'interchange',
                                x: x,
                                y: interchange,
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
                                marker: {color: 'blue'},
                                name: 'hydro',
                                x: x,
                                y: hydro,
                            },

                        ]}
                        layout={ 
                            {
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
                            }
                        }
                    />
                    <Plot
                        data={[
                            {
                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'orange'},
                                name: 'other',
                                x: xForecast,
                                y: otherForecast
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
                                marker: {color: 'yellow'},
                                name: 'solar',
                                x: xForecast,
                                y: solarForecast,
                            },
                            {
                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'black'},
                                name: 'interchange',
                                x: xForecast,
                                y: interchangeForecast,
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
                                marker: {color: 'blue'},
                                name: 'hydro',
                                x: xForecast,
                                y: hydroForecast,
                            },

                        ]}
                        layout={ 
                            {
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
                            }
                        }
                    />
                </div>
            );
        }
    }
}