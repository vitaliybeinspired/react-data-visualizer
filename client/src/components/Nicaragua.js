import React from 'react';
import Plot from 'react-plotly.js';
import {str_to_date} from './DateToWeek';

export default class Nicaragua extends React.Component {

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
                    renewable = 0;
                    non_renewable = 0;
                    green = 0;
                    non_green = 0;
                    if(i.type === 'HYDRO'){
                        hydro.push(i.value)
                        renewable += i.value;
                        green += i.value;
                    }
                    if(i.type === 'INTERCHANGE'){
                        interchange.push(i.value)
                    }
                    if(i.type === 'Other'){
                        other.push(i.value)
                    }
                    if(i.type === 'SOLAR'){
                        solar.push(i.value)
                        renewable += i.value;
                        green += i.value;
                    }
                    if(i.type === 'THERMAL'){
                        thermal.push(i.value)
                        non_renewable += i.value;
                        non_green += i.value;
                    }
                    if(i.type === 'WIND'){
                        wind.push(i.value)
                        renewable += i.value;
                        green += i.value;
                    }
                }
            }
        }
        if(forecast_data){
            var keysF = Object.getOwnPropertyNames(forecast_data);
            keysF.sort(function(a, b){
                return str_to_date(a) - str_to_date(b);
            });

            for(let i = 0; i < keysF.length; ++i){
                let dateVal = str_to_date(keysF[i]);
                if (dateVal < start || dateVal > end){
                    continue;
                }
                xForecast.push(keysF[i]);
            }

            for(let k of keysF){
                let dateVal = str_to_date(k);
                if (dateVal < start || dateVal > end){
                    continue;
                }
                yForecast.push(forecast_data[k]);
            }

           for(let k of yForecast){
               for(let i of k){
                   if(i.type === 'HYDRO'){
                       hydroForecast.push(i.value)
                   }
                   if(i.type === 'INTERCHANGE'){
                       interchangeForecast.push(i.value)
                   }
                   if(i.type === 'Other'){
                       otherForecast.push(i.value)
                   }
                   if(i.type === 'SOLAR'){
                       solarForecast.push(i.value)
                   }
                   if(i.type === 'THERMAL'){
                       thermalForecast.push(i.value)
                   }
                   if(i.type === 'WIND'){
                       windForecast.push(i.value)
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
                                marker: {color: 'black'},
                                name: 'interchange',
                                x: xForecast,
                                y: interchangeForecast,
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
                                marker: {color: 'blue'},
                                name: 'hydro',
                                x: xForecast,
                                y: hydroForecast,
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
                                marker: {color: 'red'},
                                name: 'thermal',
                                x: xForecast,
                                y: thermalForecast
                            },
                            {
                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'orange'},
                                name: 'other',
                                x: xForecast,
                                y: otherForecast
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

        //Plot just the historic data
        if((hydroForecast.length === 0 && hydro.length !== 0)){

            return (
                <div className="country-plotly">
                    <Plot
                        data={[

                        ]}
                        layout={[

                        ]}
                    />
                    <Plot
                        data={[
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
                                marker: {color: 'yellow'},
                                name: 'solar',
                                x: x,
                                y: solar,
                            },
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
                                marker: {color: 'cyan'},
                                name: 'wind',
                                x: x,
                                y: wind
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
                                marker: {color: 'orange'},
                                name: 'other',
                                x: x,
                                y: other
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
                </div>
            );
        }

        else{

            return (
                <div className="country-plotly">
                    <Plot
                        data={[
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
                                marker: {color: 'yellow'},
                                name: 'solar',
                                x: x,
                                y: solar,
                            },
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
                                marker: {color: 'cyan'},
                                name: 'wind',
                                x: x,
                                y: wind
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
                                marker: {color: 'orange'},
                                name: 'other',
                                x: x,
                                y: other
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
                                marker: {color: 'black'},
                                name: 'interchange',
                                x: xForecast,
                                y: interchangeForecast,
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
                                marker: {color: 'blue'},
                                name: 'hydro',
                                x: xForecast,
                                y: hydroForecast,
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
                                marker: {color: 'red'},
                                name: 'thermal',
                                x: xForecast,
                                y: thermalForecast
                            },
                            {
                                type: 'line',
                                stackgroup: 'one',
                                marker: {color: 'orange'},
                                name: 'other',
                                x: xForecast,
                                y: otherForecast
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
                            title: 'Forecasted'
                        }}
                    />
                </div>
            );
        }
    }
}
