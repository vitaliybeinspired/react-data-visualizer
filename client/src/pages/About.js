import '../index.css';
import '../App.css';
import React from 'react';
import NavBar from "../components/NavBar"
// images
import Max from "../images/Max.jpg";
import Vitaliy from "../images/Vitaliy.jpeg";
import Andre from "../images/Andre.jpeg";
import Naoki from "../images/Naoki.jpg";

export class About extends React.Component {
  render() {
  	return (
			<div>
				<NavBar />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				{/*
				I got rid of this bc it was messing with nav bar
				font-family: Arial, Helvetica, sans-serif; 
				*/}
				<style dangerouslySetInnerHTML={{__html: "\nbody {\n  margin: 0;\n}\n\nhtml {\n  box-sizing: border-box;\n}\n\n*, *:before, *:after {\n  box-sizing: inherit;\n}\n\n.column {\n  float: left;\n  width: 33.3%;\n  margin-bottom: 16px;\n  padding: 0 8px;\n}\n\n.card {\n  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);\n  margin: 8px;\n}\n\n.about-section {\n  padding: 50px;\n  text-align: center;\n  background-color: #474e5d;\n  color: white;\n}\n\n.container {\n  padding: 0 16px;\n}\n\n.container::after, .row::after {\n  content: \"\";\n  clear: both;\n  display: table;\n}\n\n.title {\n  color: grey;\n}\n\n.button {\n  border: none;\n  outline: 0;\n  display: inline-block;\n  padding: 8px;\n  color: white;\n  background-color: #000;\n  text-align: center;\n  cursor: pointer;\n  width: 100%;\n}\n\n.button:hover {\n  background-color: #555;\n}\n\n@media screen and (max-width: 650px) {\n  .column {\n    width: 100%;\n    display: block;\n  }\n}\n" }} />
				<div className="about-section">
					<h1>Our Mission</h1>
					<p>We are  team of bellevue college students who have teamed up with WattTime</p>
					<p>to help gather electrical generation data of the worlds nations. We aim to</p>
					<p>provide consumers, buisnesses and researchers alike with accurate information</p>
					<p>to allow them to make more eco-conscious decisions.</p>
				</div>
				<h2 style={{textAlign: 'center'}}>Our Team</h2>
				<div className="row">
					<div className="column">
						<div className="card">
							<img src={Max} alt="Max" style={{width: '100%'}} />
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
							<img src={Vitaliy} alt="Vitaliy" style={{width: '100%'}} />
							<div className="container">
								<h2>Vitaliy Stepanov</h2>
								<p className="title">Software Engineer</p>
								<p>Some text that describes me lorem ipsum ipsum lorem.</p>
								<p>vitaliy@email.edu</p>
								<p><button className="button">Contact</button></p>
							</div>
						</div>
					</div>
					<div className="column">
						<div className="card">
							<img src={Naoki} alt="Naoki" style={{width: '100%'}} />
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
							<img src={Andre} alt="Andre" style={{width: '100%'}} />
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
			</div>
    );
  }
}

export default About