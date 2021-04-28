import '../index.css';
import '../App.css'
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
                ambientLightIntensity: 0.6,
                enableDefocus: false,
                cameraRotateSpeed: 0.25,
                cameraZoomSpeed: 1.5,
                cameraAutoRotateSpeed: 0.05,
                focusAnimationDuration: 1500,
                focusEasingFunction: ['Quintic', 'InOut'],
                globeGlowPower: 5,
                enableMarkerGlow: true,
                markerEnterAnimationDuration: 0.4,
                markerGlowCoefficient: 0.5,
                markerGlowPower: 1.2,
                pointLightColor: 'gold',
                pointLightIntensity: 0.15,
                markerType: 'dot',
                markerTooltipRenderer: marker => `${marker.country}`,
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
        const country = marker['country'];
        console.log(country)
        this.setState({
            clicked: country
        });
    }

    async componentDidMount() {
        //establishing the globe function
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

        //making queries
        const config = {
            'Content-Type':'application/json'
        }
        
        // Use one of these in this body
        // dateUS -> 'mm/dd/yyyy'
        // date -> 'dd/mm/yyyy'
        // dateJS -> JS Date object

        // These are all equivalent
        const body  = {
            dateUS: '01/09/2019'
        }
        // const body  = {
        //     date: '09/01/2019'
        // }
        // const body  = {
        //     dateJS: new Date(2019, 1, 9)
        // }

        const resCRH = await axios.post(
            `query/CostaRica/Historic`,
            body,
            config
        );

        if(resCRH.status === 200) {
            this.setState({costa_rica_data: resCRH.data});
        }

        const resNH = await axios.post(
            `query/Nicaragua/Historic`,
            body,
            config
        );

        if(resNH.status === 200) {
            this.setState({nicaragua_data: resNH.data});
        }

        const resMH = await axios.post(
            `query/Mexico/Historic`,
            body,
            config
        );

        if(resMH.status === 200) {
            this.setState({mexico_data: resMH.data});
        }

        const resELH = await axios.post(
            `query/ElSalvador/Historic`,
            body,
            config
        );

        if(resELH.status === 200) {
            this.setState({el_salvador_data: resELH.data});
        }
        
        this.setState({loading: false})
    }

    Graph(props){
        if(this.state.clicked == "Mexico"){
            return(
                <Mexico_Historic dataFromParent={this.state.mexico_data}/>
            )
        }
        if(this.state.clicked == "El Salvador"){
            return(
                <El_Salvador_Historic dataFromParent={this.state.el_salvador_data}/>
            )
        }
        if(this.state.clicked == "Costa Rica"){
            return(
                <Costa_Rica_Historic dataFromParent={this.state.costa_rica_data}/>
            )
        }
        if(this.state.clicked == "Nicaragua"){
            return(
                <Nicaragua_Historic dataFromParent={this.state.nicaragua_data}/>
            )
        }
    }

    render() {
        if(!this.state.loading){
            return (
                <div>
                    <Select />
                    <DateTimePicker />
                    <ReactAudioPlayer
                        src="http://soundimage.org/wp-content/uploads/2014/07/Distant-Mountains.mp3"
                        autoPlay
                        controls
                    />
                    <div>
                        <p>{this.Graph()}
                        </p>
                    </div>
                    {this.state.globe}
                </div>
            );
        }
        else{
            return <div>Loading........</div>;
        }
    }
}

export default LandingPage