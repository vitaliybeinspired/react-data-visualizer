import '../index.css';
import '../App.css';
import './Home.css';
import React from 'react';
import NavBar from "../components/NavBar"
import DropDownButton from "../components/DropDownButton";
// images
import BC from "../images/BC.png";
import WT from "../images/WattTime.png";
import Logo from "../images/logo.png";
import System from "../images/system.PNG";
import Sara from "../images/SaraFarag.jpg";
import Connor from "../images/Connor.png";
import Gabriela from "../images/Gabby.PNG";
import Ishan from "../images/Ishan.PNG";
import Max from "../images/Max.jpg";
import Vitaliy from "../images/Vitaliy.jpeg";
import Andre from "../images/Andre.jpeg";
import Naoki from "../images/Naoki.jpg";

export class Home extends React.Component {
  render() {
  	return (
		<div className='about'>
            <NavBar />
            <div className='title'>
                <img src={Logo} alt="logo" style={{width:'20%'}} />
                <div style={{flexDirection:'column'}}>
                    <h1>G E T</h1>
                    <h2>Global Energy Transparency</h2>
                </div>
            </div>
            <div className='about-section'>
                <div className='subtitle'>
                    Our Mission
                </div>
                <h3>Smart consumption starts with transparency!</h3>
                <p> 
                    We have partnered up with WattTime to shed light on the
                    production sources of energy across the globe. This
                    information, once scattered arbitrarily across the internet,
                    can now be centralized here. As most energy information is
                    not reported in real-time, we aim to provide accurate 
                    forecasts to fill the void.
                </p>
                <p></p>
                <p> 
                    This information can enable people, businesses, and 
                    researchers to make environmentally conscious decisions and
                    take educated action against climate change!
                </p>
            </div>

            <div className='about-section'>
                <div className='subtitle'>
                    Architechture
                </div>
                <img src={System} alt="system" style={{paddingTop: '50px', width:'70vw', maxWidth:'1000px', display:'block'}} />
                <DropDownButton/>
				<h3>Repositories for this project:</h3>
                <p>Our website and back-end service is located in this reposittory: <a href="https://github.com/vitaliybeinspired/react-data-visualizer">React Viszualizer</a></p>
				<p>Our scrapers, forecasters, and 'manager' is in this reposittory: <a href="https://github.com/Naoki95957/Collect-Forecast-Visualize">Collect and Forcast</a></p>
			</div>

            <div className='about-section' style={{paddingBottom:'50px'}}>
                <div className='subtitle'>
                    Our Team
                </div>
            </div>
			<div className="contacts">
                <div className='row'>
					<div className="card">
						<img src={Max} alt="Max"/>
						<div className="container">
							<h2>Max Ayala</h2>
							<p>Software Engineer</p>
						</div>
					</div>
					<div className="card">
						<img src={Vitaliy} alt="Vitaliy"/>
						<div className="container">
							<h2>Vitaliy Stepanov</h2>
							<p>Software Engineer</p>
						</div>
					</div>
					<div className="card">
						<img src={Naoki} alt="Naoki"/>
						<div className="container">
							<h2>Naoki Lucas</h2>
							<p>Software Engineer</p>
						</div>
					</div>
					<div className="card">
						<img src={Andre} alt="Andre"/>
						<div className="container">
							<h2>Andre Weertman</h2>
							<p>Software Engineer</p>
						</div>
					</div>
                    <div className="card">
						<img src={Sara} alt="Sara"/>
						<div className="container">
							<h2>Dr. Sara Farag</h2>
							<p>CS Project Advisor</p>
						</div>
					</div>
                    <div className="card">
						<img src={Connor} alt="Connor"/>
						<div className="container">
							<h2>Connor Guest</h2>
							<p>WattTime Mentor</p>
						</div>
					</div>
                    <div className="card">
						<img src={Gabriela} alt="Gabriela"/>
						<div className="container">
							<h2>Gabriela Volpato</h2>
							<p>WattTime Mentor</p>
						</div>
					</div>
                    <div className="card">
						<img src={Ishan} alt="Ishan"/>
						<div className="container">
							<h2>Ishan Saraswat</h2>
							<p>WattTime Advisor</p>
						</div>
					</div>
				</div>
			</div>
            <div className='footer'>
                <img src={WT} alt="logo" style={{padding:'10px', width:'20%', display:'inline-block'}} />
                <img src={BC} alt="logo" style={{padding:'10px', marginLeft:'50px', width:'20%', display:'inline-block'}} />
            </div>
		</div>
    );
  }
}

export default Home