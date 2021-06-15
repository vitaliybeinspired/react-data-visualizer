import '../index.css';
import '../App.css';
import React from 'react';
import NavBar from "../components/NavBar"
import DropDownButton from "../components/DropDownButton";
// images
import Max from "../images/Max.jpg";
import Vitaliy from "../images/Vitaliy.jpeg";
import Andre from "../images/Andre.jpeg";
import Naoki from "../images/Naoki.jpg";
import Poster from "../images/Poster.jpg";


export class About extends React.Component {
  render() {
  	return (
			<div>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				{/*
				I got rid of this bc it was messing with nav bar
				font-family: Arial, Helvetica, sans-serif; 
				*/}
				<style dangerouslySetInnerHTML={{__html: "\n" +
						"body {\n  margin: 0;\n}\n\nhtml {\n  " +
						"box-sizing: border-box;\n}\n\n*, *:before, *:after {\n  " +
						"box-sizing: inherit;\n}\n\n.column {\n  " +
						"float: left;\n  width: 25.0%;\n  margin-bottom: 16px;\n  " +
						"padding: 0 8px;\n}\n\n.card {\n  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);\n  " +
						"margin: 8px;\n}\n\n.about-section {\n  " +
						"padding: 50px;\n  text-align: center;\n  " +
						"background-color: #474e5d;\n  color: white;\n}\n\n.container {\n  " +
						"padding: 0 16px;\n}\n\n.container::after, .row::after {\n  " +
						"content: \"\";\n  clear: both;\n  " +
						"display: table;\n}\n\n.title {\n  " +
						"color: grey;\n}\n\n.button {\n  border: none;\n  outline: 0;\n  display: inline-block;\n  " +
						"padding: 8px;\n  color: white;\n  background-color: #000;\n  text-align: center;\n  " +
						"cursor: pointer;\n  width: 100%;\n}\n\n.button:hover {\n  " +
						"background-color: #555;\n}\n\n@media screen and (max-width: 650px) {\n  .column {\n    width: 100%;\n    " +
						"display: block;\n  }\n}\n" }} />

				<NavBar />
				<div className="row">
					<div className="card">
						<img src={Poster} alt="Poster" style={{width: '100%'
						}} />
					</div>
				</div>

				<DropDownButton/>

				<h2 style={{textAlign: 'center'}}>Our Team</h2>
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

			</div>
    );
  }
}

export default About