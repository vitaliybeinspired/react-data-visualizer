import '../index.css';
import '../App.css';
import '../components/GlobeAndCalendar.css'
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import {Globe} from '../components/Globe.js'
import DateTimePicker from '../components/DateTimePicker'
import NavBar from '../components/NavBar'
import React from 'react';
import Sound from 'react-sound';
import Sidebar from '../components/Sidebar';
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
            globe_markers: [
                {
                    id: 'ElSalvador',
                },
                {
                    id: 'Nicaragua',
                },
                {
                    id: 'Mexico',
                },
                {
                    id: 'CostaRica',
                }
            ],
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
                }
            },
            startDate: start,
            endDate: end,
            renderSideBar: false,
        }
        this.onClickMarker = this.onClickMarker.bind(this);
        this.changeStartDate = this.changeStartDate.bind(this);
        this.changeEndDate = this.changeEndDate.bind(this);
        this.defocusHandle = this.defocusHandle.bind(this);
        this.toggleSidebarHandle = this.toggleSidebarHandle.bind(this)
    }

    onClickMarker(marker, markerObject, event) {
        this.setState({
            fetchingData: true,
            renderSideBar: true
        })
        let audio = new Audio("audio/wind.mp3")
        audio.volume = 0.1
        audio.play();
        const country_id = marker['id'];
        // this.queryData(country_id, date_to_stringUS(this.state.startDate), date_to_stringUS(this.state.endDate))
        this.setState({clicked: country_id});
    }

    /**
     * event passing for datepicker
     * @param {*} date 
     */
    changeStartDate(date){
        this.setState({startDate: date});
        this.state.globe_markers.forEach(element => {
            this.queryData(element.id, date_to_stringUS(this.state.startDate), date_to_stringUS(this.state.endDate));
        });
    }

    /**
     * event passing for datepicker
     * @param {*} date 
     */
    changeEndDate(date){
        this.setState({endDate: date});
        this.state.globe_markers.forEach(element => {
            this.queryData(element.id, date_to_stringUS(this.state.startDate), date_to_stringUS(this.state.endDate));
        });
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
            console.log(this.state.country_data)
        }
        this.setState({fetchingData: false})
    }

    defocusHandle(){
        this.setState({
            renderSideBar: false
        });
    }

    toggleSidebarHandle() {
        this.setState({
            renderSideBar: !this.state.renderSideBar
        });
    }

    componentDidMount() {

        this.queryData('ElSalvador', this.state.startDate, this.state.endDate)
        this.queryData('Mexico', this.state.startDate, this.state.endDate)
        this.queryData('CostaRica', this.state.startDate, this.state.endDate)
        this.queryData('Nicaragua', this.state.startDate, this.state.endDate)
        
        this.setState({
            globe: new Globe(
                {
                    markerClick: this.onClickMarker,
                    defocusHandler: this.defocusHandle
                }
            ).getGlobe()
        });
        this.setState({loading: false})
    }

    render() {
        if(this.state.loading){
            return <div>Loading........</div>;
        }

        let hist = null;
        let frcst = null;
        if (this.state.clicked != "none") {
            hist = this.state.country_data[this.state.clicked]['Historic'];
            frcst = this.state.country_data[this.state.clicked]['Forecast'];
        }
        
        return (
            <div className="globe">
                <NavBar/>
                <Sound
                    url="audio/Distant-Mountains.mp3"
                    playStatus={Sound.status.PLAYING}
                    volume={0}
                    loop={true}
                />
                <Sidebar 
                    toggleCollapseHandle={this.toggleSidebarHandle}
                    collapsed={!this.state.renderSideBar}
                    calendar={DateTimePicker(this.state.startDate, this.state.endDate, this.changeStartDate, this.changeEndDate)}
                    hist={hist}
                    frcst={frcst}
                />
                {this.state.globe}
            </div>
        );
    }
}

export default LandingPage