import Dropdown from "react-bootstrap/Dropdown";
import 'bootstrap/dist/css/bootstrap.min.css';


function DropDownButton() {
    return (
        <div className="dropdown">
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    View Documents
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1" >
                        <a href="https://github.com/Naoki95957/Collect-Forecast-Visualize/raw/master/Documents/Press%20Release%20FAQ.pdf"> Press Release (PR) </a>
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-1">
                        <a href="https://github.com/Naoki95957/Collect-Forecast-Visualize/raw/master/Documents/Software%20Requirements%20Specifications.pdf"> Software Requirements Specification (SRS) </a>
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-1">
                        <a href="https://github.com/Naoki95957/Collect-Forecast-Visualize/raw/master/Documents/Software%20Design%20Document.pdf"> Software Design Document (SDD) </a>
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-1">
                        <a href="https://github.com/Naoki95957/Collect-Forecast-Visualize/raw/master/Documents/Software%20Test%20Document.pdf"> Software Test Document (STD) </a>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default DropDownButton