import '../index.css';
import '../App.css';
import '../components/Globe.css'
import {Globe} from '../components/Globe.js'
import DateTimePicker from '../components/DateTimePicker'
import NavBar from '../components/NavBar'
import React from 'react';
import Sound from 'react-sound';
import Sidebar from '../components/Sidebar';

const axios = require('axios');

export class LandingPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            clicked: "none",
            country_data: {
                "ElSalvador" : null,
                "Mexico" : null,
                "Nicaragua" : null,
                "CostaRica" : null,
            },
        }
        this.onClickMarker = this.onClickMarker.bind(this);
    }

    onClickMarker(marker, markerObject, event) {
        let audio = new Audio("audio/wind.mp3")
        audio.volume = 0.1
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
            globe: new Globe(
                {
                    markerClick: this.onClickMarker,
                }
            ).getGlobe()
        });
        this.setState({loading: false})
    }

    render() {
        if(this.state.loading){
            return <div>Loading........</div>;
        }
        
        return (
            <div className="globe">
                <NavBar/>
                <DateTimePicker/>
                <Sound
                    url="audio/Distant-Mountains.mp3"
                    playStatus={Sound.status.PLAYING}
                    volume={0}
                    loop={true}
                />
                <Sidebar data={this.state.country_data[this.state.clicked]}/>
                {this.state.globe}
            </div>
        );
    }
}

export default LandingPage