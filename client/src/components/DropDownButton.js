import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from "react-bootstrap/Dropdown";



function DropDownButton() {
    return (
        <div className="dropdown">
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    View Documents
                </Dropdown.Toggle>

                <Dropdown.Menu>

                    <Dropdown.Item href="#/action-1">Software Requirements Specification (SRS)</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another Document</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default DropDownButton