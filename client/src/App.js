import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {LandingPage} from './pages/LandingPage';
import {About} from './pages/About';
import {ExportData} from './pages/ExportData';
import axios from 'axios';

// These will be our proxies
// this is for backend axios requests
axios.defaults.baseURL = "https://cfv-server.herokuapp.com/";

function App() {
  return (
    <div className='App'>
        <Router>
          <Switch>
            <Route exact path ='/' component = {LandingPage}/>
            <Route exact path ='/about' component = {About}/>
            <Route exact path ='/exportdata' component = {ExportData}/>
          </Switch>
        </Router>
    </div>    
  );
}

export default App;
