import './App.css';
import './index.css';
import Costa_Rica_Historic from './components/Costa_Rica_Historic.js';
import Button from './components/Buttons';
import Select from './components/Select';
import React from 'react';
const axios = require('axios');

class App extends React.Component {

    constructor(props) {
        super(props);
        this.handleViewMexicoClick = this.handleViewMexicoClick.bind(this);
        this.handleViewNicaraguaClick = this.handleViewNicaraguaClick.bind(this);
        this.state = {
            isViewMexicoButton: false
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/CostaRica/Historic`)
          .then(res => {
            this.setState({ costa_rica_data: res.data });
          })
    }

    handleViewMexicoClick() {
        this.setState({isViewMexicoButton: true});
    }

    handleViewNicaraguaClick() {
        this.setState({isViewMexicoButton: false});
    }

    render() {
        if(this.state.costa_rica_data){
            const isViewMexico = this.state.isViewMexicoButton;
            let currentData;
            let selectViewButton;

            // logic to change states
            if (isViewMexico) {
                selectViewButton = <ViewNicaraguaButton onClick={this.handleViewNicaraguaClick} />;
                currentData = <Costa_Rica_Historic dataFromParent={this.state.costa_rica_data}/>

            } else {
                selectViewButton = <ViewMexicoButton onClick={this.handleViewMexicoClick} />;
            }

            return (
                <div>
                    <Main isViewMexicoButton={isViewMexico} />
                    {selectViewButton}
                    <Select />
                    {currentData}
                </div>
            );
        }
        else{
            return <div>Loading........</div>;
        }
    }
}

function RenderComponentNicaragua() {
    return <h1> This is a component that renders from view Nicaragua button </h1>;
}

function RenderComponentMexico() {
    return <h1> This is a component that renders from view Mexico button </h1>;
}


function Main(props) {
    const isViewMexicoButton = props.isViewMexicoButton;
    if (isViewMexicoButton) {
        return <>
            <RenderComponentNicaragua />
            <Button />
            </>
    }
    return <>
        <RenderComponentMexico />
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