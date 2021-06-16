import React from 'react';
import {str_to_date} from './DateToWeek';
import './Plot.css';
import Plotly from 'react-plotly.js';

export class Accuracy extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            empty: false,
            p_empty: false,
        }
    }

    getData() {
        let start = this.props.startDate;
        let end = this.props.endDate;

        // HIST
        this.hydro = [];
        this.wind = [];
        this.solar = [];
        this.thermal = [];
        this.other = [];
        this.interchange = [];
        this.biomass = [];
        this.geothermal = [];

        let hour = [];
        let data = this.props.hist;

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
        }
        if(hour.length < 1 && !this.state.empty){
            this.setState({empty: true})
        }else if(hour.length > 1 && this.state.empty){
            this.setState({empty: false})
        }

        let hydro_energy = 0;
        let wind_energy = 0;
        let solar_energy = 0;
        let thermal_energy = 0;
        let other_energy = 0;
        let interchange_energy = 0;
        let biomass_energy = 0;
        let geothermal_energy = 0;

        for(let h of hour){
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
        }

        // FRCST
        this.p_hydro = [];
        this.p_wind = [];
        this.p_solar = [];
        this.p_thermal = [];
        this.p_other = [];
        this.p_interchange = [];
        this.p_biomass = [];
        this.p_geothermal = [];

        let p_hour = [];
        let pred = this.props.frcst;

        delete pred['_id'];
        let p_keys = Object.getOwnPropertyNames(pred);
        p_keys.sort(function(a, b){
            return str_to_date(a) - str_to_date(b);
        });
        for(let p_k of p_keys){
            let p_dateVal = str_to_date(p_k);
            if (p_dateVal < start || p_dateVal > end){
                continue;
            }
            p_hour.push(pred[p_k]);
        }
        if(p_hour.length < 1 && !this.state.p_empty){
            this.setState({p_empty: true})
        }else if(p_hour.length > 1 && this.state.p_empty){
            this.setState({p_empty: false})
        }

        let p_hydro_energy = 0;
        let p_wind_energy = 0;
        let p_solar_energy = 0;
        let p_thermal_energy = 0;
        let p_other_energy = 0;
        let p_interchange_energy = 0;
        let p_biomass_energy = 0;
        let p_geothermal_energy = 0;

        for(let p_h of p_hour){
            for(let p_i of p_h){
                if( p_i.type === 'Hydroelectric' ||
                    p_i.type === 'HydroElectric' ||
                    p_i.type === 'HYDRO') {
                    p_hydro_energy = p_i.value
                }
                if( p_i.type === 'Interchange' ||
                    p_i.type === 'Interconnection' ||
                    p_i.type === 'INTERCHANGE') {
                    p_interchange_energy = p_i.value
                }
                if( p_i.type === 'Conventional Thermal' ||
                    p_i.type === 'Thermal' ||
                    p_i.type === 'THERMAL') {
                    p_thermal_energy = p_i.value
                }
                if( p_i.type === 'Solar' ||
                    p_i.type === 'SOLAR') {
                    p_solar_energy = p_i.value
                }
                if( p_i.type === 'Wind' ||
                    p_i.type === 'WIND') {
                    p_wind_energy = p_i.value
                }
                if( p_i.type === 'Geothermal' ||
                    p_i.type === 'Geothermalelectric') {
                    p_geothermal_energy = p_i.value
                }
                if( p_i.type === 'Biomass') {
                    p_biomass_energy = p_i.value
                }
                if( p_i.type === 'Other') {
                    p_other_energy = p_i.value
                }
            }

            this.p_hydro.push(p_hydro_energy);
            this.p_wind.push(p_wind_energy);
            this.p_solar.push(p_solar_energy);
            this.p_thermal.push(p_thermal_energy);
            this.p_other.push(p_other_energy);
            this.p_interchange.push(p_interchange_energy);
            this.p_biomass.push(p_biomass_energy);
            this.p_geothermal.push(p_geothermal_energy);
        }


        // ERROR
        this.e_hydro = [];
        this.e_wind = [];
        this.e_solar = [];
        this.e_thermal = [];
        this.e_other = [];
        this.e_interchange = [];
        this.e_biomass = [];
        this.e_geothermal = [];

        this.mae_hydro = 0;
        this.mae_wind = 0;
        this.mae_solar = 0;
        this.mae_thermal = 0;
        this.mae_other = 0;
        this.mae_interchange = 0;
        this.mae_biomass = 0;
        this.mae_geothermal = 0;

        let e_h = 0;
        let e_w = 0;
        let e_s = 0;
        let e_t = 0;
        let e_b = 0;
        let e_g = 0;

        let n = hour.length
        for(let m = 0; m < n; m++) {
            e_h = Math.abs(this.p_hydro[m] - this.hydro[m])
            e_w = Math.abs(this.p_wind[m] - this.wind[m])
            e_s = Math.abs(this.p_solar[m] - this.solar[m])
            e_t = Math.abs(this.p_thermal[m] - this.thermal[m])
            e_b = Math.abs(this.p_biomass[m] - this.biomass[m])
            e_g = Math.abs(this.p_geothermal[m] - this.geothermal[m])

            this.mae_hydro += e_h
            this.mae_wind += e_w
            this.mae_solar += e_s
            this.mae_thermal += e_t
            this.mae_biomass += e_b
            this.mae_geothermal += e_g
            
            this.e_hydro.push(e_h)
            this.e_wind.push(e_w)
            this.e_solar.push(e_s)
            this.e_thermal.push(e_t)
            this.e_biomass.push(e_b)
            this.e_geothermal.push(e_g)
        }
        
        this.mae_hydro /= n
        this.mae_wind /= n
        this.mae_solar /= n
        this.mae_thermal /= n
        this.mae_biomass /= n
        this.mae_geothermal /= n

    }

    render() {    
        if(!this.props.hist || !this.props.frcst) {
            return <div className="message">No data yet.</div>;
        } else {
            this.getData();
            if(this.thermal.length === 0) {
                return <div/>
            }
        }

        let error_data = []
        let t = 'line'
        if(this.e_solar) {
            error_data.push({
                type: {t},
                stackgroup: 'one',
                marker: {color: 'yellow'},
                name: 'Solar',
                y: this.e_solar
            })
        }
        if(this.e_geothermal) {
            error_data.push({
                type: {t},
                stackgroup: 'one',
                marker: {color: 'orange'},
                name: 'Geothermal',
                y: this.e_geothermal
            })
        }
        if(this.e_biomass) {
            error_data.push({
                type: {t},
                stackgroup: 'one',
                marker: {color: 'lime'},
                name: 'Biomass',
                y: this.e_biomass
            })
        }
        if(this.e_wind) {
            error_data.push({
                type: {t},
                stackgroup: 'one',
                marker: {color: 'cyan'},
                name: 'Wind',
                y: this.e_wind
            })
        }
        if(this.e_thermal) {
            error_data.push({
                type: {t},
                stackgroup: 'one',
                marker: {color: 'red'},
                name: 'Thermal',
                y: this.e_thermal
            })
        }
        if(this.e_hydro) {
            error_data.push({
                type: {t},
                stackgroup: 'one',
                marker: {color: 'blue'},
                name: 'Hydroelectric',
                y: this.e_hydro
            })
        }

        // let x = []
        // let y = []


        let mae_data = [
            {
                x: ['solar', 'wind', 'hydro', 'thermal', 'biomass', 'geothermal',],
                y: [
                    this.mae_solar,
                    this.mae_wind,
                    this.mae_hydro,
                    this.mae_thermal,
                    this.mae_biomass,
                    this.mae_geothermal
                ],
                type: 'bar'
            }
        ];

        if(this.state.empty || this.state.p_empty){
            return null
        }

        return (
            <div className="country-plotly">
                <Plotly
                    data={error_data}
                    layout={{
                        width: 600, 
                        height: 400,
                        yaxis:{
                            title: "MWh",
                            gridcolor: "#FFFFFF55"
                        },
                        xaxis:{
                            title: "time",
                            showticklabels: false,
                            gridcolor: "#FFFFFF55"
                        },
                        plot_bgcolor:"#FFFFFF99",
                        paper_bgcolor:"#00000000",
                        font: 
                            {
                                color: "#FFFFFF",
                            },
                        title: "Forecast Errors"
                    }}
                />

                <Plotly
                    data={mae_data}
                    layout={{
                        width: 600, 
                        height: 400,
                        yaxis:{
                            title: "MWh",
                            gridcolor: "#FFFFFF55"
                        },
                        plot_bgcolor:"#FFFFFF99",
                        paper_bgcolor:"#00000000",
                        font: 
                            {
                                color: "#FFFFFF",
                            },
                        title: "Forecast MAE"
                    }}
                />
            </div>
        );
    }
}

export default Accuracy