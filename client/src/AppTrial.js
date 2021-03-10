import React from "react";
import "./App.css";
import axios from "axios";

class App extends React.Component{

  state = {
    country: '',
    data_type: '',
    date: '',
    data: []
  };

  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    })
  };

  submit = (event) => {
    event.preventDefault();

    const payload = {
      country: this.state.country,
      data_type: this.state.data_type,
      date: this.state.date
    };

      
    axios.post('http://localhost:8080/QueryRequest',{
      data: payload
    })
      .then(() => {
        console.log('Query Request sent');
      })
      .catch(() => {
        console.log('Query Request Error')
      });

      /*
      app.get('/QueryRequest', (req, res) => {
        res.json(payload);
      });*/
    /*
    async function getData() {
      try {
        const response = await axios.get('http://localhost:8080/QueryData');
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }

    getData();*/
  };

  componentDidMount() {
    axios.get('http://localhost:8080/QueryData')
      .then(res => {
        const data = res.data;
        this.state.data = data;
      })
    console.log(this.data);
  }

  render(){

    console.log('State:', this.state);
    return (
      <div>
        <h2>Trial Client</h2>
        <form onSubmit={this.submit}>
          <div className="form-input">
            <input
              type="text"
              name="country"
              placeholder="Country Name"
              value={this.state.country}
              onChange={this.handleChange}
              />
          </div>
          <div className="form-input">
            <input
              type="text"
              name="data_type"
              placeholder="Historic/Forecast"
              value={this.state.data_type}
              onChange={this.handleChange}
              />
          </div>
          <div className="form-input">
            <input
              type="text"
              name="date"
              placeholder="Enter Date"
              value={this.state.date}
              onChange={this.handleChange}
              />
          </div>
          <button>Submit</button>
        </form>
        <ul>
        { this.state.data.map(data => <li>{data.name}</li>)}
      </ul>
      </div>
    );
  }
}

export default App;

/*
function App() {
  Axios({
    method: "GET",
    url: "http://localhost:8080/CostaRica/Historic",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    console.log(res.data);
  });*/
