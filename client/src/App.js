import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Map} from './pages/Map';
import {Home} from './pages/Home';
import axios from 'axios';

// These will be our proxies
// this is for backend axios requests
axios.defaults.baseURL = "https://cfv-server.herokuapp.com/";

function App() {
  return (
    <div className='App'>
        <Router>
          <Switch>
            <Route exact path ='/' component = {Home}/>
            <Route exact path ='/map' component = {Map}/>
          </Switch>
        </Router>
    </div>    
  );
}

export default App;
