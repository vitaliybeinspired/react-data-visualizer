import './App.css';
import './index.css';
import React from 'react';
import Nicaragua from './components/Nicaragua.js';
import Map from './components/Mexico';
import Button from './components/Buttons';
import Select from './components/Select';
const axios = require('axios');

class App extends React.Component {

    state = {queriedData: []};

    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {isLoggedIn: false};
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/QueryData`)
          .then(res => {
            const queriedData = res.data;
            this.setState({ queriedData });
          })
    }


    handleLoginClick() {
        this.setState({isLoggedIn: true});
    }

    handleLogoutClick() {
        this.setState({isLoggedIn: false});
    }

    render() {

        console.log(this.state);

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
                <makeGetRequest />
            </div>
        );
    }
};

function UserGreeting() {
    return <h1> Nicaragua Interactive Graph </h1>;
}

function GuestGreeting() {
    return <h1> Map of the World!</h1>;
}

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <>
            <UserGreeting />
            <Nicaragua />
            <Button />
            </>
    }
    return <>
        <GuestGreeting />
        <Map />
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