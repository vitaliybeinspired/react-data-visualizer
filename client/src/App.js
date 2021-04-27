import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {LandingPage} from './pages/LandingPage'
import {SimpleGlobe} from './pages/GlobeTest'

function App() {
  return (
    <div className='App'>
        <Router>
            <Route exact path ='/' component = {LandingPage}/>
            <Route exact path ='/' component = {SimpleGlobe}/>

            {/*we can add more path's here*/}
        </Router>      
    </div>    
  );
}

export default App;
