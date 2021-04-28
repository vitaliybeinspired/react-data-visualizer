import React from 'react';
import Plot from 'react-plotly.js';

export default class El_Salvador_Historic extends React.Component {

    render() {

        let x = [];
        let y = [];
        let hydro = [];
        let wind = [];
        let solar = [];
        let thermal = [];
        let other = [];
        let interchange = [];
        let biomass = [];
        let geothermal = [];

        var data = this.props.dataFromParent;
        if(data){
            let dataDict = data;
            delete dataDict['_id'];
            console.log(dataDict)

            for(let k in dataDict){
                x.push(k);
            }

            for(let k of Object.values(dataDict)){
                y.push(k);
            }

            for(let k of y){
                for(let i of k){
                    if(i.type === 'HydroElectric'){
                        hydro.push(i.value)
                    }
                    if(i.type === 'Interconnection'){
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
                    if(i.type === 'Biomass'){
                        biomass.push(i.value)
                    }
                    if(i.type === 'Geothermal'){
                        geothermal.push(i.value)
                    }
                }
            }
        }
        else{
            return <div className="country-plotly">Loading...</div>;
        }

        return (
            <div className="country-plotly">
                <Plot
                    data={[
                        {

                            type: 'line',
                            marker: {color: 'blue'},
                            name: 'hydro',
                            x: x,
                            y: hydro,
                        },
                        {
                            type: 'line',
                            marker: {color: 'black'},
                            name: 'interchange',
                            x: x,
                            y: interchange,
                        },
                        {

                            type: 'line',
                            marker: {color: 'yellow'},
                            name: 'solar',
                            x: x,
                            y: solar,
                        },
                        {

                            type: 'line',
                            marker: {color: 'red'},
                            name: 'thermal',
                            x: x,
                            y: thermal
                        },
                        {
                            type: 'line',
                            marker: {color: 'cyan'},
                            name: 'wind',
                            x: x,
                            y: wind
                        },
                        {
                            type: 'line',
                            marker: {color: 'orange'},
                            name: 'geothermal',
                            x: x,
                            y: geothermal
                        },
                        {
                            type: 'line',
                            marker: {color: 'green'},
                            name: 'biomass',
                            x: x,
                            y: biomass
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
                        title: 'El Salvador Historic'
                    }}
                />
            </div>
        );
    }
}