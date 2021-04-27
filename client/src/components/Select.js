import React from 'react';

class Select extends React.Component {

    state = {
        country: '',
        data_type: '',
        date: '',
    };

    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
          [name]: value
        })
    }

    submit = (event) => {
        event.preventDefault();
    
        const payload = {
          data_type: this.state.data_type,
          date: this.state.date
        };
        console.log({payload: payload})
    }

    getState(){
        return this.state;
    }


    render() {
        return (
            <div className="selection-form">
                <form onSubmit={this.submit}>
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
            </div>
        );
    }
}





export default Select