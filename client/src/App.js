import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {LandingPage} from './pages/LandingPage';
import {About} from './pages/About';
import {ExportData} from './pages/ExportData';
import Title from './components/Title';

function App() {
  return (
    <div className='App'>
        <Router>
          <Title />
          <Route exact path ='/' component = {LandingPage}/>
          <Route exact path ='/about' component = {About}/>
          <Route exact path ='/exportdata' component = {ExportData}/>
        </Router>      
    </div>    
  );
}

export default App;
