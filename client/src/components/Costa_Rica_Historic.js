import React from 'react';
import Plot from 'react-plotly.js';

export default class Costa_Rica_Historic extends React.Component {

    render() {

        let x = [];
        let y = [];
        let hydro = [];
        let wind = [];
        let solar = [];
        let thermal = [];
        let other = [];
        let interchange = [];

       var data = this.props.dataFromParent
        //var data = this.state.data

        if(data){
            delete data['_id'];

            for(let k in data){
                x.push(k);
            }

            for(let k of Object.values(data)){
                y.push(k);
            }
            
            // TODO
            // we should have an array of types
            // and make a general purpose utility class/func
            //
            // psuedo code:
            // if type not in array
            //      //create new dict for type
            //      dict[type] = [value]
            // if type in array
            //      dict[type].push(value)

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
        else{
            return <div className="country-plotly">Loading...</div>;
        }

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
                            title: 'Costa Rica Historic'
                        }
                    }
                />
            </div>
        );
    }
}