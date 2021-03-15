import React from 'react';
import Plot from 'react-plotly.js';

class Nicaragua extends React.Component {
    render() {
        return (
            <>
                <h1>{this.props.data}</h1>
                <Plot
                    data={[

                        {
                            x: [1, 2, 3],
                            y: [2, 6, 3],
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: {color: 'red'},
                        },
                        {type: 'line', x: [1, 2, 3], y: [2, 5, 3]},
                    ]}
                    layout={ {width: 500, height: 400, title: 'Nicaragua Energy Analysis'} }
                />
            </>
        );
    }
}





export default Nicaragua