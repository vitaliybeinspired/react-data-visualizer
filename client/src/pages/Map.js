import '../index.css';
import '../App.css';
import '../components/GlobeAndCalendar.css'
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import {Globe, markers} from '../components/Globe.js'
import NavBar from '../components/NavBar'
import React from 'react';
import Sound from 'react-sound';
import Sidebar from '../components/Sidebar';

const {date_to_stringUS, date_to_weekUS}  = require('../components/DateToWeek');
const axios = require('axios');
const volume = 40;

export class Map extends React.Component {

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
            muted: false,
            //Used to indicate whether new data is being processed or not
            fetchingData: false,
            clicked: "none",
            country: "none",
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
            eval_start: date_to_stringUS(start),
            eval_end: date_to_stringUS(end),
            renderSideBar: false,
        }
        this.onClickMarker = this.onClickMarker.bind(this);
        this.changeStartDate = this.changeStartDate.bind(this);
        this.changeEndDate = this.changeEndDate.bind(this);
        this.defocusHandle = this.defocusHandle.bind(this);
        this.muteHandler = this.muteHandler.bind(this);
        this.toggleSidebarHandle = this.toggleSidebarHandle.bind(this)
    }

    muteHandler(){
        this.setState({
            muted: !this.state.muted
        });
    }

    onClickMarker(marker, markerObject, event) {
        this.setState({
            renderSideBar: true
        })
        let vol = 0.3;
        if(this.state.muted){
            vol = 0;
        }
        let audio = new Audio("audio/wind.mp3")
        audio.volume = vol;
        audio.play();
        const country_id = marker['id'];
        const country = marker['country']
        // this.queryData(country_id, date_to_stringUS(this.state.startDate), date_to_stringUS(this.state.endDate))
        this.setState({
            clicked: country_id,
            country: country
        });
    }

    /**
     * event passing for datepicker
     * @param {*} date 
     */
    changeStartDate(date, callback=null){
        this.setState({
            startDate: date
        });
        markers.forEach(element => {
            this.queryData(element.id, date_to_stringUS(this.state.startDate), date_to_stringUS(this.state.endDate), callback);
        });
    }

    /**
     * event passing for datepicker
     * @param {*} date 
     */
    changeEndDate(date, callback=null){
        this.setState({
            endDate: date
        });
        markers.forEach(element => {
            this.queryData(element.id, date_to_stringUS(this.state.startDate), date_to_stringUS(this.state.endDate), callback);
        });
    }

    async queryData(country_string, start_date, end_date, callback=null)
    {
        //We already have the data
        if( this.state.eval_start === start_date && this.state.eval_end === end_date){
            this.setState({fetchingData: false})
            return
        }else{
            this.setState({fetchingData: true})
        }
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
            this.setState({
                country_data: copy,
                eval_start: start_date,
                eval_end: end_date
            });
            console.log(this.state.country_data)
            this.setState({fetchingData: false})
        }
        if(callback !== null){
            callback()
        }
    }

    defocusHandle(){
        let vol = 0.3;
        if(this.state.muted){
            vol = 0;
        }
        let audio = new Audio("audio/wind.mp3")
        audio.volume = vol;
        audio.play();
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
        
        // this.state.markers.forEach(element => {
        //     if (this.state.country_data[element.id]["Historic"] !== null) {
        //         let i = 0;
        //         let sum = 0;
        //         for (let day of this.state.country_data[element.id]["Historic"]) {
        //             for (let hour of day) {
        //                 for (let energy of hour) {
        //                     i++;
        //                     sum += energy;
        //                 }
        //             }
        //         }
        //         let mean = (sum/i);
        //         element.value = mean/40;
        //     }
        // });

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
        if (this.state.clicked !== "none") {
            hist = this.state.country_data[this.state.clicked]['Historic'];
            frcst = this.state.country_data[this.state.clicked]['Forecast'];
        }

        let vol = volume;
        if(this.state.muted){
            vol = 0;
        }
        
        return (
            <div className="globe">
                <NavBar/>
                <Sound
                    url="audio/Distant-Mountains.mp3"
                    playStatus={Sound.status.PLAYING}
                    volume={vol}
                    loop={true}
                />
                <Sidebar
                    toggleCollapseHandle={this.toggleSidebarHandle}
                    muted={this.state.muted}
                    muteHandler={this.muteHandler}
                    collapsed={!this.state.renderSideBar}
                    loading={this.state.fetchingData}
                    changeEndDate={this.changeEndDate}
                    changeStartDate={this.changeStartDate}
                    hist={hist}
                    frcst={frcst}
                    start={this.state.startDate}
                    end={this.state.endDate}
                    country={this.state.country}
                />

                {this.state.globe}
            </div>
        );
    }
}

export default Map