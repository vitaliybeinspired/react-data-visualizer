import './App.css';
import './index.css';
import React from 'react';
import Costa_Rica_Historic from './components/Costa_Rica_Historic.js';
import Button from './components/Buttons';
import Select from './components/Select';
const axios = require('axios');



class App extends React.Component {

    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {isLoggedIn: false,
        };
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/CostaRica/Historic`)
          .then(res => {
            const data = res.data;
            this.setState({ data });
            console.log(this.state.data);
          })
    }


    handleLoginClick() {
        this.setState({isLoggedIn: true});
    }

    handleLogoutClick() {
        this.setState({isLoggedIn: false});
    }

    render() {
        console.log(this.state.data);

        while(!this.state.data){

            return <div>Loading...</div>;
            sleep(1000);
        }

        if(this.state.data){

            const isLoggedIn = this.state.isLoggedIn;
            let button;

            if (isLoggedIn) {
                button = <LogoutButton onClick={this.handleLogoutClick} />;
            } else {
                button = <LoginButton onClick={this.handleLoginClick} />;
            }

            return (
                <div>
                    <Greeting isLoggedIn={isLoggedIn} />
                    {button}
                    <Select />
                    <Costa_Rica_Historic dataFromParent = {this.state.data} />
                </div>
            );
        }
        else{
            return <div>Loading........</div>;
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function UserGreeting() {
    return <h1> Nicaragua Interactive Graph </h1>;
}

function GuestGreeting() {
    return <h1> Energy Data</h1>;
}

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <>
            <UserGreeting />
            <Button />
            </>
    }
    return <>
        <GuestGreeting />
        <Button />

    </>
}

function LoginButton(props) {
    return (
        <button onClick={props.onClick}>
            View Nicaragua
        </button>
    );
}

function LogoutButton(props) {
    return (
        <button onClick={props.onClick}>
            View Mexico
        </button>
    );
}

export default App;