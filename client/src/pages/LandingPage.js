import '../index.css';
import '../App.css';
import Costa_Rica_Historic from '../components/Costa_Rica_Historic.js';
import Nicaragua_Historic from '../components/Nicaragua_Historic.js';
import Mexico_Historic from '../components/Mexico_Historic.js';
import El_Salvador_Historic from '../components/El_Salvador_Historic.js'
import {SimpleGlobe} from '../components/Globe'
import DateTimePicker from '../components/DateTimePicker'
import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

const axios = require('axios');

export class LandingPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            clicked: "none",
            //GLOBE settings
            //value is abitrary and represents size
            globe_markers: [
                {
                    id: 'ElSalvador',
                    country: 'El Salvador',
                    color: 'red',
                    coordinates: [13.598871, -88.909731],
                    value: 20,
                },
                {
                    id: 'Nicaragua',
                    country: 'Nicaragua',
                    color: 'gold',
                    coordinates: [12.793830, -84.854074],
                    value: 20,
                },
                {
                    id: 'Mexico',
                    country: 'Mexico',
                    color: 'orange',
                    coordinates: [23.502654, -102.227797],
                    value: 20,
                },
                {
                    id: 'CostaRica',
                    country: 'Costa Rica',
                    color: 'green',
                    coordinates: [10.031846, -83.896692],
                    value: 20,
                }
            ],
            // simple and extensive options to configure globe here:
            // https://github.com/chrisrzhou/react-globe/blob/main/docs/props.mdx
            globe_options: {
                ambientLightColor: 'white',
                ambientLightIntensity: 0.15,
                enableDefocus: false,
                cameraRotateSpeed: 0.25,
                cameraZoomSpeed: 1.5,
                cameraAutoRotateSpeed: 0.025,
                focusAnimationDuration: 1750,
                focusEasingFunction: ['Quintic', 'InOut'],
                globeGlowPower: 5,
                enableMarkerGlow: true,
                markerEnterAnimationDuration: 0.4,
                markerGlowCoefficient: 0.5,
                markerGlowPower: 1.2,
                pointLightColor: 'white',
                pointLightIntensity: 1.0,
                pointLightPositionRadiusScales: [-1500, 500, 1500],
                markerType: 'dot',
                markerTooltipRenderer: marker => `${marker.country}`,
            },
            country_data: {
                "ElSalvador" : null,
                "Mexico" : null,
                "Nicaragua" : null,
                "CostaRica" : null,
            },
        }
        this.onClickMarker = this.onClickMarker.bind(this);
    }

    /**
     * 'onClick' event for globe
     * gets a marker, object, and event
     * @param {*} marker 
     * @param {*} markerObject 
     * @param {*} event 
     */
    onClickMarker(marker, markerObject, event) {
        let audio = new Audio("audio/wind.mp3")
        audio.play();
        console.log(marker, markerObject, event)
        const country_id = marker['id'];
        this.queryData(country_id, '01/09/2019')
        this.setState({clicked: country_id});
    }

    async queryData(country_string, date_string)
    {
        const config = {
            'Content-Type':'application/json'
        }
        
        // Use one of these in this body
        // dateUS -> 'mm/dd/yyyy'
        // date -> 'dd/mm/yyyy'
        // dateJS -> JS Date object

        // These are all equivalent
        const body  = {
            dateUS: date_string
        }
        // const body  = {
        //     date: '09/01/2019'
        // }
        // const body  = {
        //     dateJS: new Date(2019, 1, 9)
        // }

        const res = await axios.post(
            `query/${country_string}/Historic`,
            body,
            config
        );

        if(res.status === 200) {
            let copy = this.state.country_data
            copy[country_string] = res.data
            this.setState({country_data: copy});
        }
    }

    componentDidMount() {
        this.setState({
            globe: new SimpleGlobe(
                {
                    markerClick: this.onClickMarker,
                    markers: this.state.globe_markers,
                    options: this.state.globe_options,
                    initialCoordinates: [17.4921, -84.0852]
                }
            ).getGlobe()
        });
        this.setState({loading: false})
    }

    graph(){
        if(this.state.clicked === "Mexico"){
            return(
                <Mexico_Historic dataFromParent={this.state.country_data['Mexico']}/>
            )
        }
        else if(this.state.clicked === "ElSalvador"){
            return(
                <El_Salvador_Historic dataFromParent={this.state.country_data['ElSalvador']}/>
            )
        }
        else if(this.state.clicked === "CostaRica"){
            return(
                <Costa_Rica_Historic dataFromParent={this.state.country_data['CostaRica']}/>
            )
        }
        else if(this.state.clicked === "Nicaragua"){
            return(
                <Nicaragua_Historic dataFromParent={this.state.country_data['Nicaragua']}/>
            )
        }
        else{
            return <div className="country-plotly"/>
        }
    }

    render() {
        if(!this.state.loading){
            return (
                <div>
                    <div className="globe">
                        <DateTimePicker />
                        <ReactAudioPlayer
                            src="audio/Distant-Mountains.mp3"
                            id="bgm-audio-player"
                            controls
                            autoPlay
                            loop
                        />
                        {this.graph()}
                        {this.state.globe}
                    </div>
                </div>
            );
        }
        else{
            return <div>Loading........</div>;
        }
    }
}

export default LandingPage