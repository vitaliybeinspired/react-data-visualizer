import React from 'react';
import Plot from 'react-plotly.js';

export default class Mexico_Historic extends React.Component {
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


        var data = this.props.dataFromParent;

        console.log(data);
        if(data){
            delete data['_id'];
            console.log(data)

            for(let k in data){
                x.push(k);
            }

            for(let k of Object.values(data)){
                y.push(k);
            }

            for(let k of y){
                for(let i of k){
                    if(i.type === 'HydroElectric'){
                        hydro.push(i.value)
                    }
                    if(i.type === 'Internal Combustion'){
                        internal_combustion.push(i.value)
                    }
                    if(i.type === 'Conventional Thermal'){
                        thermal.push(i.value)
                    }
                    if(i.type === 'Wind'){
                        wind.push(i.value)
                    }
                    if(i.type === 'Biomass'){
                        biomass.push(i.value)
                    }
                    if(i.type === 'Nuclear Power'){
                        nuclear_power.push(i.value)
                    }
                    if(i.type === 'Turbo Gas'){
                        turbo_gas.push(i.value)
                    }
                    if(i.type === 'Geothermalelectric'){
                        geothermalelectric.push(i.value)
                    }
                }
            }
        }
        else{
            return <div>Loading...</div>;
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
                            name: 'internal combustion',
                            x: x,
                            y: internal_combustion,
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
                            name: 'biomass',
                            x: x,
                            y: biomass
                        },
                        {
                            type: 'line',
                            marker: {color: 'grey'},
                            name: 'nuclear power',
                            x: x,
                            y: nuclear_power
                        },
                        {
                            type: 'line',
                            marker: {color: 'grey'},
                            name: 'turbo gas',
                            x: x,
                            y: turbo_gas
                        },
                        {
                            type: 'line',
                            marker: {color: 'green'},
                            name: 'geothermal electric',
                            x: x,
                            y: geothermalelectric
                        },

                    ]}
                    layout={ {width: 800, height: 400, title: 'Mexico Historic'} }
                />
            </div>
        );
    }
}