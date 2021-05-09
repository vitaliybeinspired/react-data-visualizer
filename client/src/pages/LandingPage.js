import '../index.css';
import '../App.css';
import '../components/Globe.css'
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import Costa_Rica_Historic from '../components/Costa_Rica_Historic.js';
import Nicaragua_Historic from '../components/Nicaragua_Historic.js';
import Mexico_Historic from '../components/Mexico_Historic.js';
import El_Salvador_Historic from '../components/El_Salvador_Historic.js'
import {SimpleGlobe} from '../components/Globe'
import DateTimePicker from '../components/DateTimePicker'
import NavBar from '../components/NavBar'
import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
const {date_to_string, date_to_stringUS, date_to_week, date_to_weekUS, date_to_weekJS}  = require('../components/DateToWeek');

const axios = require('axios');

export class LandingPage extends React.Component {

    constructor(props) {
        super(props);

        let today = new Date();
        today.setDate(today.getDate() - 7);
        var todaySTR = date_to_weekUS(today.toLocaleDateString());
        var dateParts = todaySTR.split("/");
        var start = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

        var end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 6)

        this.state = {
            loading: true,
            //Used to indicate whether new data is being processed or not
            fetchingData: false,
            clicked: "none",
            volume: 0.33,
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
                focusDistanceRadiusScale: 1.75,
                focusEasingFunction: ['Quintic', 'InOut'],
                globeGlowPower: 5,
                globeCloudsOpacity: 0.8,
                enableMarkerGlow: true,
                markerGlowCoefficient: 0.5,
                markerGlowPower: 1.2,
                pointLightColor: 'white',
                pointLightIntensity: 1.0,
                pointLightPositionRadiusScales: [-1500, 500, 1500],
                markerType: 'dot',
                markerTooltipRenderer: marker => `${marker.country}`,
            },
            country_data: {
                "ElSalvador" : {
                    "Historic" : null,
                    "Forecast" : null,
                },
                "Mexico" : {
                    "Historic" : null,
                    "Forecast" : null,
                },
                "Nicaragua" : {
                    "Historic" : null,
                    "Forecast" : null,
                },
                "CostaRica" : {
                    "Historic" : null,
                    "Forecast" : null,
                },
            },
            startDate: start,
            endDate: end
        }
        this.onClickMarker = this.onClickMarker.bind(this);
        this.changeStartDate = this.changeStartDate.bind(this);
        this.changeEndDate = this.changeEndDate.bind(this);
    }

    /**
     * 'onClick' event for globe
     * gets a marker, object, and event
     * @param {*} marker 
     * @param {*} markerObject 
     * @param {*} event 
     */
    onClickMarker(marker, markerObject, event) {
        this.setState({fetchingData: true})
        let audio = new Audio("audio/wind.mp3")
        audio.volume = this.state.volume
        audio.play();
        const country_id = marker['id'];
        this.queryData(country_id, date_to_stringUS(this.state.startDate), date_to_stringUS(this.state.endDate))
        this.setState({clicked: country_id});
    }

    /**
     * event passing for datepicker
     * @param {*} date 
     */
    changeStartDate(date){
        this.setState({startDate: date});
        if(this.state.clicked != "none"){
            this.queryData(this.state.clicked, date_to_stringUS(this.state.startDate), date_to_stringUS(this.state.endDate));
        }
        
    }

    /**
     * event passing for datepicker
     * @param {*} date 
     */
    changeEndDate(date){
        this.setState({endDate: date});
        if(this.state.clicked != "none"){
            this.queryData(this.state.clicked, date_to_stringUS(this.state.startDate), date_to_stringUS(this.state.endDate));
        }
    }

    async queryData(country_string, start_date, end_date)
    {
        const config = {
            'Content-Type':'application/json'
        }
        
        // date_range example:
        // This expects both parameters to be in the form:
        //  MM/DD/YYYY
        const body  = {
            date_range: [start_date, end_date]
        }

        // Use one of these in this body
        // dateUS -> 'mm/dd/yyyy'
        // date -> 'dd/mm/yyyy'
        // dateJS -> JS Date object

        // These are all equivalent
        // const body  = {
        //     dateUS: '01/09/2019'
        // }
        // const body  = {
        //     date: '09/01/2019'
        // }
        // const body  = {
        //     dateJS: new Date(2019, 1, 9)
        // }

        const res = await axios.post(
            `/query/${country_string}`,
            body,
            config
        );

        if(res.status === 200) {
            let copy = this.state.country_data
            let hist = res.data['Historic'];
            let forecast = res.data['Forecast'];
            copy[country_string]['Historic'] = hist;
            copy[country_string]['Forecast'] = forecast;
            this.setState({country_data: copy});
        }
        this.setState({fetchingData: false})
    }

    volumeChangeEvent(volume){
        this.setState({volume: volume});
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
                <Mexico_Historic
                    dataFromParent={this.state.country_data['Mexico']}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                />
            )
        }
        else if(this.state.clicked === "ElSalvador"){
            return(
                <El_Salvador_Historic
                    dataFromParent={this.state.country_data['ElSalvador']}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                />
            )
        }
        else if(this.state.clicked === "CostaRica"){
            return(
                <Costa_Rica_Historic
                    dataFromParent={this.state.country_data['CostaRica']}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                />
            )
        }
        else if(this.state.clicked === "Nicaragua"){
            return(
                <Nicaragua_Historic
                    dataFromParent={this.state.country_data['Nicaragua']}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                />
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
                        <NavBar/>
                        {DateTimePicker(this.state.startDate, this.state.endDate, this.changeStartDate, this.changeEndDate)}
                        <ReactAudioPlayer
                            src="audio/Distant-Mountains.mp3"
                            controls
                            autoPlay
                            loop
                            muted={false}
                            volume={this.state.volume}
                            onVolumeChanged={(e) => e['path'][0].muted ? this.volumeChangeEvent(0) : this.volumeChangeEvent(e['path'][0].volume)}
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