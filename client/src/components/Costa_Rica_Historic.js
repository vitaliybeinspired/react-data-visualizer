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
            console.log(data)

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
                            name: 'other',
                            x: x,
                            y: other
                        },

                    ]}
                    layout={ {width: 800, height: 400, title: 'Costa Rica Historic'} }
                />
            </div>
        );
    }
}