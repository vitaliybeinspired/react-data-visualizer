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
        this.handleViewMexicoClick = this.handleViewMexicoClick.bind(this);
        this.handleViewNicaraguaClick = this.handleViewNicaraguaClick.bind(this);
        this.state = {
            isViewMexicoButton: false,
            data: null
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/CostaRica/Historic`)
          .then(res => {
            this.setState({ data: res.data });
            console.log(this.state.data);
          })
    }


    handleViewMexicoClick() {
        this.setState({isViewMexicoButton: true});
    }

    handleViewNicaraguaClick() {
        this.setState({isViewMexicoButton: false});
    }

    render() {
        console.log(this.state.data);

        if(this.state.data){

            const isViewMexico = this.state.isViewMexicoButton;
            let button;

            if (isViewMexico) {
                button = <ViewNicaraguaButton onClick={this.handleViewNicaraguaClick} />;
            } else {
                button = <ViewMexicoButton onClick={this.handleViewMexicoClick} />;
            }

            return (
                <div>
                    <Greeting isViewMexicoButton={isViewMexico} />
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

function UserGreeting() {
    return <h1> Nicaragua Interactive Graph </h1>;
}

function GuestGreeting() {
    return <h1> Energy Data</h1>;
}

function Greeting(props) {
    const isViewMexicoButton = props.isViewMexicoButton;
    if (isViewMexicoButton) {
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

function ViewMexicoButton(props) {
    return (
        <button onClick={props.onClick}>
            View Nicaragua
        </button>
    );
}

function ViewNicaraguaButton(props) {
    return (
        <button onClick={props.onClick}>
            View Mexico
        </button>
    );
}

export default App;