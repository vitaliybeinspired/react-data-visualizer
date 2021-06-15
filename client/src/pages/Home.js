import '../index.css';
import '../App.css';
import './Home.css';
import React from 'react';
import NavBar from "../components/NavBar"
import DropDownButton from "../components/DropDownButton";
// images
import Logo from "../images/logo.png";
import System from "../images/system.PNG";
import Max from "../images/Max.jpg";
import Vitaliy from "../images/Vitaliy.jpeg";
import Andre from "../images/Andre.jpeg";
import Naoki from "../images/Naoki.jpg";

export class Home extends React.Component {
  render() {
  	return (
		<div>
            <NavBar />
            <div className='title'>
                <img src={Logo} alt="logo" style={{width:'20%', display:'inline-block'}} />
                <div style={{paddingRight:'100px', display:'inline-block'}}>
                    <h1>G . E . T .</h1>
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
                <img src={System} alt="system" style={{paddingTop: '50px', width:'70vw', maxWidth:'150%', display:'block'}} />
            </div>

            <div className='about-section' style={{paddingBottom:'200px'}}>
                <div className='subtitle'>
                    Our Team
                </div>
            </div>
			<DropDownButton/>

            <div className="row">
				<div className="column">
					<div className="card">
						<img src={Max} alt="Max" style={{width: '25%'}} />
						<div className="container">
							<h2>Max Ayala</h2>
							<p className="title">Software Engineer</p>
							<p>Some text that describes me lorem ipsum ipsum lorem.</p>
							<p>max@email.edu</p>
							<p><button className="button">Contact</button></p>
						</div>
					</div>
				</div>
				<div className="column">
					<div className="card">
						<img src={Vitaliy} alt="Vitaliy" style={{width: '25%'}} />
						<div className="container">
							<h2>Vitaliy Stepanov</h2>
							<p className="title">Software Engineer</p>
							<p>Vitaliy Stepanov is a computer science student who changed majors from business. He has skills in machine learning, data science, software engineering, and many programming languages. He has industry experience as an intern as a data analyst for his capstone. He was in an artificial intelligence program as a trainee and won 2nd place in the makeathon. He's interested in AI, finance, and creating innovative products.
							</p>
							<p>vitaliybeinspired@gmail.com</p>
							<p><button className="button">Contact</button></p>
						</div>
					</div>
				</div>
				<div className="column">
					<div className="card">
						<img src={Naoki} alt="Naoki" style={{width: '25%'}} />
						<div className="container">
							<h2>Naoki Lucas</h2>
							<p className="title">Software Engineer</p>
							<p>Some text that describes me lorem ipsum ipsum lorem.</p>
							<p>naoki@email.edu</p>
							<p><button className="button">Contact</button></p>
						</div>
					</div>
				</div>
				<div className="column">
					<div className="card">
						<img src={Andre} alt="Andre" style={{width: '25%'}} />
						<div className="container">
							<h2>Andre Weertman</h2>
							<p className="title">Software Engineer</p>
							<p>Some text that describes me lorem ipsum ipsum lorem.</p>
							<p>andre@email.com</p>
							<p><button className="button">Contact</button></p>
						</div>
					</div>
				</div>
			</div>

            <div className='footer'>
                
            </div>
		</div>
    );
  }
}

export default Home