import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {LandingPage} from './pages/LandingPage';
import {About} from './pages/About';
import {ExportData} from './pages/ExportData';
import BrowserRouter from 'react-router-dom/BrowserRouter';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
          <Router basename={process.env.PUBLIC_URL}>
            <Route exact path ='/' component = {LandingPage}/>
            <Route exact path ='/about' component = {About}/>
            <Route exact path ='/exportdata' component = {ExportData}/>
          </Router>
      </BrowserRouter>
    </div>    
  );
}

export default App;
